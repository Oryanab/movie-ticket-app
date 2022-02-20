FROM python:latest

# Add crontab file in the cron directory
ADD crontab /etc/cron.d/crontab
COPY . .
RUN pip install -r requirements.txt
# Give execution rights on the cron job

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

#Install Cron
RUN apt-get update
RUN apt-get -y install cron

# Run the command on container startup
CMD service cron start ; tail -f /var/log/cron.log 