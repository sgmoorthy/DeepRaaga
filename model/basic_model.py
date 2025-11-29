import tensorflow as tf

class BasicRaagaModel(tf.keras.Model):
    def __init__(self, config):
        super(BasicRaagaModel, self).__init__()
        self.config = config
        self.lstm_layers = []
        for _ in range(config['num_layers']):
            self.lstm_layers.append(
                tf.keras.layers.LSTM(
                    units=config['units_per_layer'],
                    return_sequences=True,
                    dropout=config['dropout_rate']
                )
            )
        self.output_layer = tf.keras.layers.Dense(config['output_dim'])
        self.optimizer = tf.keras.optimizers.Adam()
        self.loss_fn = tf.keras.losses.MeanSquaredError()

    def build(self):
        input_shape = (None, None, self.config['input_dim'])
        self.build_graph(input_shape)

    def build_graph(self, input_shape):
        self.build_model(input_shape)

    def build_model(self, input_shape):
        inputs = tf.keras.Input(shape=input_shape[1:])
        x = inputs
        for lstm_layer in self.lstm_layers:
            x = lstm_layer(x)
        outputs = self.output_layer(x)
        self.model = tf.keras.Model(inputs=inputs, outputs=outputs)
        self.model.compile(
            optimizer=self.optimizer,
            loss=self.loss_fn,
            metrics=['accuracy']
        )

    def train(self, train_dataset, val_dataset):
        self.model.fit(
            train_dataset,
            validation_data=val_dataset,
            epochs=self.config['epochs'],
            batch_size=self.config['batch_size']
        )

    def save(self, filepath):
        self.model.save(filepath)

    def load(self, filepath):
        self.model = tf.keras.models.load_model(filepath)