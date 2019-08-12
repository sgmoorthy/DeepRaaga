class VGGModel(BaseModel):
        def __init__(self, config):
            super(VGGModel, self).__init__(config)
            #call the build_model and init_saver functions.
            self.build_model() 
            self.init_saver() 
