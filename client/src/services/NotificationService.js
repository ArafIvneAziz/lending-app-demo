class NotificationService {
  static async sendNotification(message, to) {
    const response = await fetch('/api/notifications', { // replace with real API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, to }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to send notification');
    }
  }

  static async getNotifications() {
    const response = await fetch('/api/notifications'); // replace with real API endpoint

    if (response.ok) {
      const data = await response.json();
      return data.notifications;
    } else {
      throw new Error('Failed to get notifications');
    }
  }
}

export default NotificationService;
/*
The sendNotification method sends a POST request to /api/notifications with the message and to (recipient). If the request is successful, it returns the response data. If the request is not successful (i.e., the response status was not OK), it throws an error.

The getNotifications method sends a GET request to /api/notifications to retrieve the notifications. If the request is successful, it returns the notifications data from the response. If the request is not successful, it throws an error.

Again, these are just examples and the actual implementation may vary based on the actual API you're working with.
*/