const params = (new URL(document.location)).searchParams;
localStorage.profile = params.get('profile')
document.title = 'Done';
