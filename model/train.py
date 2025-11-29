import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np
from model import DeepRagaModel
from data_processor import DataProcessor
import os
import pickle

class RagaDataset(Dataset):
    def __init__(self, data_dir, split='train'):
        self.data_dir = data_dir
        self.split = split
        self.X = []
        self.y = []
        self.load_data()
        
    def load_data(self):
        """Load preprocessed data from numpy files"""
        try:
            # Load preprocessed features
            X_path = os.path.join(self.data_dir, 'processed', 'X.npy')
            y_path = os.path.join(self.data_dir, 'processed', 'y.npy')
            
            if os.path.exists(X_path) and os.path.exists(y_path):
                self.X = np.load(X_path)
                self.y = np.load(y_path)
                
                # Simple split for train/val (80/20) if not already split
                # In a real scenario, we'd have separate folders or files
                split_idx = int(0.8 * len(self.X))
                if self.split == 'train':
                    self.X = self.X[:split_idx]
                    self.y = self.y[:split_idx]
                else:
                    self.X = self.X[split_idx:]
                    self.y = self.y[split_idx:]
                    
                print(f"Loaded {len(self.X)} sequences for {self.split}")
            else:
                print(f"Could not find preprocessed features in {self.data_dir}")
                # If not found, we might need to process it first
                # For now, we assume it's processed
        except Exception as e:
            print(f"Error loading data: {str(e)}")
        
    def __len__(self):
        return len(self.X)
        
    def __getitem__(self, idx):
        return {
            'sequence': torch.LongTensor(self.X[idx]),
            'target': torch.LongTensor([self.y[idx]]).squeeze()
        }

def train_model(model, train_loader, val_loader, num_epochs, device, vocab_size):
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters())
    
    for epoch in range(num_epochs):
        model.train()
        train_loss = 0
        for batch in train_loader:
            sequences = batch['sequence'].to(device)
            targets = batch['target'].to(device)
            
            optimizer.zero_grad()
            outputs, _ = model(sequences)
            loss = criterion(outputs, targets)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            
        # Validation
        model.eval()
        val_loss = 0
        correct = 0
        total = 0
        with torch.no_grad():
            for batch in val_loader:
                sequences = batch['sequence'].to(device)
                targets = batch['target'].to(device)
                
                outputs, _ = model(sequences)
                loss = criterion(outputs, targets)
                val_loss += loss.item()
                
                _, predicted = outputs.max(1)
                total += targets.size(0)
                correct += predicted.eq(targets).sum().item()
        
        print(f'Epoch {epoch+1}/{num_epochs}')
        print(f'Train Loss: {train_loss/len(train_loader):.4f}')
        if len(val_loader) > 0:
            print(f'Val Loss: {val_loss/len(val_loader):.4f}')
            print(f'Val Accuracy: {100.*correct/total:.2f}%')

def main():
    # Configuration
    data_dir = 'data'
    processed_dir = os.path.join(data_dir, 'processed')
    model_dir = 'model'
    os.makedirs(processed_dir, exist_ok=True)
    os.makedirs(model_dir, exist_ok=True)
    
    # Initialize DataProcessor
    processor = DataProcessor()
    
    # Check if data needs processing
    if not os.path.exists(os.path.join(processed_dir, 'X.npy')):
        print("Processing data...")
        processor.process_dataset(os.path.join(data_dir, 'raw'), processed_dir)
    else:
        print("Loading existing vocabulary...")
        processor.load_vocab(os.path.join(processed_dir, 'vocab.pkl'))
    
    vocab_size = len(processor.note_to_int)
    print(f"Vocabulary size: {vocab_size}")
    
    if vocab_size == 0:
        print("No data found or processed. Exiting.")
        return

    # Hyperparameters
    embedding_dim = 64
    hidden_size = 256
    num_layers = 2
    batch_size = 32
    num_epochs = 50
    
    # Device configuration
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    # Initialize model
    model = DeepRagaModel(vocab_size, embedding_dim, hidden_size, num_layers).to(device)
    
    # Load data
    train_dataset = RagaDataset(data_dir, split='train')
    val_dataset = RagaDataset(data_dir, split='val')
    
    if len(train_dataset) == 0:
        print("No training data available.")
        return
        
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size)
    
    # Train the model
    train_model(model, train_loader, val_loader, num_epochs, device, vocab_size)
    
    # Save the trained model
    torch.save(model.state_dict(), os.path.join(model_dir, 'trained_model.pth'))
    print("Model saved!")

if __name__ == '__main__':
    main()