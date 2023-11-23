CarrierWave.configure do |config|
    config.fog_credentials = {
      :provider               => 'AWS',          
      :aws_access_key_id      => 'AKIAUD4WQK3JVSO3UH7B',                   
      :aws_secret_access_key  => '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',                     
      :region                 => 'us-east-1',             
    }
    config.fog_directory  = 'curbsena'       
    config.fog_public     = true                                
end