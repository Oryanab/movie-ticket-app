FROM python:latest

# Add crontab file in the cron directory
RUN touch /etc/cron.d/crontab
COPY . .
RUN ./entrypoint.sh
# Create the log file to be able to run tail
RUN touch /var/log/cron.log
RUN pip install -r requirements.txt

#Install Cron
RUN apt-get update
RUN apt-get -y install cron

# Run the command on container startup
CMD service cron start ; tail -f /var/log/cron.log 