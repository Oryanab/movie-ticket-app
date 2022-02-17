import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function ThankYouPage() {
  function getCookie(cname: string) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  return (
    <>
      {getCookie('tickets') && (
        <div
          style={{
            margin: 'auto',
            height: '60vh',
            width: '50vw',
            position: 'fixed',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            background: 'white',
            border: '0.5vh solid black',
            borderRadius: '20px',
            textAlign: 'center',
            paddingTop: '20vh',
          }}
        >
          <h1>Thank You {name}!</h1>
          <h5>Your receipt and information was sent via mail </h5>
          <Button href="/" style={{ margin: '0.2vw' }} variant="outline-dark">
            Visit Home Page
          </Button>
          <Button href="/ticket-panel" style={{ margin: '0.2vw' }} variant="outline-dark">
            View Your Tickets
          </Button>
        </div>
      )}
    </>
  );
}
