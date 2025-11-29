import torch
import torch.nn as nn

class DeepRagaModel(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_size, num_layers, dropout=0.3):
        super(DeepRagaModel, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        
        # Embedding layer
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        
        # LSTM layers
        self.lstm = nn.LSTM(embedding_dim, hidden_size, num_layers, 
                           batch_first=True, dropout=dropout)
        
        # Attention mechanism
        self.attention = nn.MultiheadAttention(hidden_size, num_heads=4, batch_first=True)
        
        # Dense layers for final prediction
        self.fc1 = nn.Linear(hidden_size, hidden_size)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(dropout)
        self.fc2 = nn.Linear(hidden_size, vocab_size)
        
    def forward(self, x, hidden=None):
        # x shape: (batch_size, seq_len)
        
        # Embed input
        # shape: (batch_size, seq_len, embedding_dim)
        embedded = self.embedding(x)
        
        # Forward propagate LSTM
        # lstm_out shape: (batch_size, seq_len, hidden_size)
        lstm_out, hidden = self.lstm(embedded, hidden)
        
        # Apply attention mechanism
        # attn_output shape: (batch_size, seq_len, hidden_size)
        attn_output, _ = self.attention(lstm_out, lstm_out, lstm_out)
        
        # We only care about the last time step for next note prediction
        # shape: (batch_size, hidden_size)
        last_time_step = attn_output[:, -1, :]
        
        # Dense layers
        out = self.fc1(last_time_step)
        out = self.relu(out)
        out = self.dropout(out)
        out = self.fc2(out)
        
        return out, hidden