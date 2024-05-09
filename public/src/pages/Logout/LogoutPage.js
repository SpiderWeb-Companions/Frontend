export async function LogoutPage(queryString) {

    let html ='';
    try {
        sessionStorage.clear();
    } catch (error) {
        html = `
        <h2>Failed to logout - logging out can be achieved by closing the tab</h2>
    `
    }

    html = `<h2>Successfully logged out!</h2>`
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(new DOMParser().parseFromString(html, 'text/html').body.firstChild);

}