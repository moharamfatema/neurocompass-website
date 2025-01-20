import loguru

logger = loguru.logger

logger.add(
    "logs/{time:YYYY-MM-DD}.log",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}",
    rotation="00:00",
    retention="7 days",
    enqueue=True,
    serialize=True,
) 
