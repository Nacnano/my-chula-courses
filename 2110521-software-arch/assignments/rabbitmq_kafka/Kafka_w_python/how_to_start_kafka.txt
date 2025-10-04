# run the Kafka container
docker run -d --name kafka \
  -p 9092:9092 \
  -e ALLOW_PLAINTEXT_LISTENER=yes \
  -e KAFKA_CFG_NODE_ID=1 \
  -e KAFKA_CFG_PROCESS_ROLES=broker,controller \
  -e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
  -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
  -e KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT \
  -e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@localhost:9093 \
  bitnami/kafka:latest

# install a python library to connect to Kafka's server
pip install kafka-python

docker exec kafka kafka-topics.sh --delete --topic my-topic --bootstrap-server localhost:9092
sleep 2
docker exec kafka kafka-topics.sh --create --topic my-topic --bootstrap-server localhost:9092 --partitions 4 --replication-factor 1
docker exec kafka kafka-topics.sh --describe --topic my-topic --bootstrap-server localhost:9092

# Try running the fast_consumer.py
python fast_consumer.py

# Try running the Producer.py
python producer_round_robin.py



