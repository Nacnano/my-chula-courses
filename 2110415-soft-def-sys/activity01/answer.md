1. Prometheus.yml

```
global:
scrape_interval: 15s
scrape_configs:
- job_name: node
  static_configs:
  - targets: ["node-exporter:9100", "apache-exporter:9117", "apache:80"]

```

2. Commands

   - 2.1 Docker Network
     `docker network create mynet`
   - 2.2 Persistent storage
     `docker volume create grafana-vol`
     and
     `docker run --rm -d -p 3000:3000 --network mynet -v grafana-vol:/var/lib/grafana --name grafana grafana/grafana`
   - 2.3 Run Containers
     `docker run --rm -d --name node-exporter -p 9100:9100 --network mynet prom/node-exporter`
     `docker run --rm -d --name prometheus -p 9090:9090 --network mynet -v ./prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus`
     `docker run --rm -d -p 3000:3000 --network mynet -v grafana-vol:/var/lib/grafana --name grafana grafana/grafana`
     `docker run -d --rm --name apache --network mynet -p 8080:80 -v ./status.conf:/etc/apache2/mods-enabled/status.conf ubuntu/apache2`
     `docker run -d --rm --name apache-exporter --network mynet -p 9117:9117 bitnami/apache-exporter --scrape_uri="http://apache:80/server-status?auto"`

3. Grafana Graphs
   3.1 Node Exporter
   ![alt text](image.png)
   3.2 Apache Exporter
   ![alt text](image-1.png)
