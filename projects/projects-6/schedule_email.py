import os
import time
from datetime import datetime, timedelta
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from googleapiclient.discovery import build

from gmail_auth import authenticate_gmail

def create_message_with_attachment(to, subject, message_text, file_path):
    message = MIMEMultipart()
    message['to'] = to
    message['subject'] = subject

    msg = MIMEText(message_text)
    message.attach(msg)

    with open(file_path, 'rb') as f:
        mime_base = MIMEBase('application', 'octet-stream')
        mime_base.set_payload(f.read())
        encoders.encode_base64(mime_base)
        mime_base.add_header('Content-Disposition', f'attachment; filename="{os.path.basename(file_path)}"')
        message.attach(mime_base)

    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {'raw': raw}

def send_message(service, user_id, message):
    try:
        sent_message = service.users().messages().send(userId=user_id, body=message).execute()
        print('Message Id: %s' % sent_message['id'])
        return sent_message
    except Exception as e:
        print(f'An error occurred: {e}')
        return None

def schedule_email(to, subject, message_text, file_path, send_time):
    current_time = datetime.now()
    delay = (send_time - current_time).total_seconds()
    if delay > 0:
        time.sleep(delay)
        creds = authenticate_gmail()
        service = build('gmail', 'v1', credentials=creds)
        message = create_message_with_attachment(to, subject, message_text, file_path)
        send_message(service, 'me', message)

if __name__ == '__main__':
    to = "your-email@gmail.com"
    subject = "Scheduled Email with Attachment"
    message_text = "This is a test email with an attachment sent to you from the future!"
    file_path = "path/to/your/last/image.jpg"  # replace with your image path
    send_time = datetime.now() + timedelta(minutes=1)  # schedule 1 minute in the future
    
    print(f"Email scheduled to be sent at: {send_time}")
    schedule_email(to, subject, message_text, file_path, send_time)
