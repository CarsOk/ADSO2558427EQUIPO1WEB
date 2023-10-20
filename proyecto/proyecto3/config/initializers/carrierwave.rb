CarrierWave.configure do |config|
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      :provider               => 'AWS',                        # required
      :aws_access_key_id      => 'AKIAUD4WQK3JVSO3UH7B',                        # required
      :aws_secret_access_key  => '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',                        # required
      :region                 => 'us-east-1',                  # optional, defaults to 'us-east-1'
      #:host                   => 's3.example.com',             # optional, defaults to nil
      #:endpoint               => 'https://s3.example.com:8080' # optional, defaults to nil
    }
    config.fog_directory  = 'curbsena'                     # required
    config.fog_public     = true                                   # optional, defaults to true
    #config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end