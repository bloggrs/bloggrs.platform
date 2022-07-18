/**
 * Theme: Dastone - Responsive Bootstrap 5 Admin Dashboard
 * Author: Bloggrs
 * Timeout Js
 */


$.sessionTimeout({
  message: 'Your session will be locked in 30 seconds.',
  keepAliveUrl: 'pages-starter.html',
  logoutButton:'Logout',
  logoutUrl: '/auth/logout',
  redirUrl: 'auth-lock-screen.html',
  warnAfter: 3000,
  redirAfter: 30000,
  countdownBar: true
});
