CREATE EXTERNAL TABLE IF NOT EXISTS track_a_move_prod.serco(
  altitude float COMMENT 'from deserializer', 
  bearing float COMMENT 'from deserializer', 
  journey_id string COMMENT 'from deserializer', 
  latitude float COMMENT 'from deserializer', 
  longitude float COMMENT 'from deserializer', 
  precision_hdop float COMMENT 'from deserializer', 
  precision_vdop float COMMENT 'from deserializer', 
  received_timestamp string COMMENT 'from deserializer', 
  speed float COMMENT 'from deserializer', 
  tracking_id string COMMENT 'from deserializer', 
  tracking_timestamp string COMMENT 'from deserializer', 
  vehicle_registration string COMMENT 'from deserializer', 
  vehicle_vin string COMMENT 'from deserializer')
PARTITIONED BY ( 
  year int, 
  month int, 
  day int, 
  hour int)
ROW FORMAT SERDE 
  'org.openx.data.jsonserde.JsonSerDe' 
STORED AS INPUTFORMAT 
  'org.apache.hadoop.mapred.TextInputFormat' 
OUTPUTFORMAT 
  'org.apache.hadoop.hive.ql.io.IgnoreKeyTextOutputFormat'
LOCATION
  's3://cloud-platform-a44bd529aff62d1d45abb661371ada5c/serco';
