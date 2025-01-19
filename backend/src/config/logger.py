import loguru

logger = loguru.logger
# format : {time:YYYY-MM-DD HH:mm:ss} | {level} | {message}
# output : terminal and /logs/date.log
# rotation : daily
# retention : 7 days
# json : true

logger.add(
    "logs/{time:YYYY-MM-DD}.log",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}",
    rotation="00:00",
    retention="7 days",
    enqueue=True,
    serialize=True,
) 
