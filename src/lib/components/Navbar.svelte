<script>

  // @ts-nocheck

  import Signup from './Signup.svelte';
  import Login from './Login.svelte';

  import { getUserData,getUsername } from '$lib/api/csFunctions';
  import { getNotifications } from '$lib/api/clientFunctions';
  import { logout } from '$lib/api/csFunctions';
  import { user, username } from '../../routes/UserStore';
  import { goto } from '$app/navigation';

  import { onMount } from 'svelte';

  let notifications = [];

  onMount( async () => {
    const userRes = await getUserData();
    if (userRes) { 
      user.set(userRes)
      const res = await getUsername(userRes.id);
      if (res.success){username.set(res.data[0].username)}

      notifications = await getNotificationList(userRes.id)
    }  
  })

  const handleLogout = async () => {
    await logout();
    user.set(null);
    username.set(null);
    goto('/')
  }

  const getNotificationList = async (userId) => {
    const res = await getNotifications(userId);
    if (res.success) {
      return res.data
    } else {
      console.log(res.error)
    }
  }

  

  let showSignupModal = false;
  let showLoginModal = false;

  const toggleSignupModal = () => {showSignupModal = !showSignupModal}
  const toggleLoginModal = () => {showLoginModal = !showLoginModal}

  let innerWidth=0;
  let innerHeight=0;

  $: smallScreen = innerHeight < 500;

</script>

<svelte:window bind:innerWidth bind:innerHeight />

<Signup showModal={showSignupModal} toggle={toggleSignupModal}/>
<Login showModal={showLoginModal} toggle={toggleLoginModal}/>

<!-- Sidebar -->
<div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="staticBackdropLabel">
<div class="offcanvas-header">
  <!-- svelte-ignore a11y-missing-content -->
  <h5 class="offcanvas-title" id="staticBackdropLabel"></h5>
  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div class="offcanvas-body">
  <div class="container" id="sidebar-links" data-bs-toggle="offcanvas">
    <div class="row">
      <ul class="list-group list-group-flush" >
        <a href="/"><li class="list-group-item"><i class="bi bi-house"></i>Home</li></a>
        <a href="/swaps"><li class="list-group-item"><i class="bi bi-arrow-left-right"></i>Swaps</li></a>
        <a href="/reviews"><li class="list-group-item"><i class="bi bi-chat-left-text"></i>Reviews</li></a>
        <a href="/donations"><li class="list-group-item"><i class="bi bi-heart"></i>Donations</li></a>
        <a href="/jobs"><li class="list-group-item"><i class="bi bi-box-seam"></i>Jobs</li></a>
      </ul>
    </div>
    <div class="row">
      <ul class="list-group list-group-flush" >
        <a href="/about"><li class="list-group-item"><i class="bi bi-info-square"></i>About Us</li></a>
        <a href="/faq"><li class="list-group-item"><i class="bi bi-question-octagon"></i>FAQs</li></a>
      </ul>
    </div>
  </div>
</div>
</div>

<nav class="navbar sticky-top navbar-expand-lg navbar-light" id="navbar">
  <div class="container-fluid">

    <div class="row g-2 justify-content-start align-items-center">
      <!-- Sidebar button -->
      <div class="col">
      </div>
      <div class="col">
        <div class="navbar-brand" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="staticBackdrop"><img src = "images/logo.svg" id="logo" alt="Logo"/></div>
        
      </div>
    </div>

    <div class="row justify-content-center">

    {#if $username}
    <div class="col-2 mx-1">
      
      <ul style="list-style: none">
        <li class="nav-item dropdown mx-5">
            <button class="nav-link" id="notification-button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-bell"></i></button>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div class="container" id="notifications-container">
            {#each notifications as notification (notification.id)}
              
                {#if notification.type == "swap"}
                <div class="notification-item" on:click={()=>goto('/swaps')}>
                    <div class="row">
                      <p>{notification.text}</p>
                    <div class="row notification-date">
                      <small class="text-muted">{new Date(notification.created_at).toLocaleString()}</small>
                    </div>
                  </div>
                </div>
                {:else if notification.type == "comment-donations"}
                <div class="notification-item" on:click={()=>goto('/donations')}>
                  <div class="row">
                    <p>{notification.text}</p>
                  <div class="row notification-date">
                    <small class="text-muted">{new Date(notification.created_at).toLocaleString()}</small>
                  </div>
                </div>
              </div>
                
                {:else if notification.type == "comment-jobs"}
                <div class="notification-item" on:click={()=>goto('/jobs')}>
                  <div class="row">
                    <li><p>{notification.text}</p></li>
                  <div class="row notification-date">
                    <small class="text-muted">{new Date(notification.created_at).toLocaleString()}</small>
                  </div>
                </div>
              </div>
                
                {/if}
              

             
            {/each}
          </div>
          </ul>
        </li>
        </ul>
    </div>
    
    <div class="col-9 m-0 px-2">
      <ul style="list-style: none;">
        <li class="nav-item dropdown mx-5">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             {$username}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/settings">Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item" on:click={handleLogout}>Logout</button></li>
          </ul>
        </li>
        </ul>
    </div>
    
    
    {:else}
    <form class="d-flex">
      <!-- Signup modal trigger -->
      <div class="col">
        <button type="button" class="btn btn-outline-success" id="signup-button" on:click={toggleSignupModal}>
            Signup
        </button>
      </div>
      <!-- Login modal trigger -->
      <div class="col">
        <button type="button" class="btn btn-outline-success" id="login-button" on:click={toggleLoginModal}>
            Login
        </button>
      </div>
    </form>
    {/if}
    </div>
  </div>
</nav>



<style>

  #logo{
    width: 100px;
    cursor: pointer;
  }

  #navbar, #sidebar, .list-group-item, .dropdown-menu {
    background-color: var(--secondary);
  }

  #navbar {
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }

  #sidebar {
    width: 350px;
    font-family: var(--font-primary);
    font-size: 20px;
  }
  
  #sidebar-links {
    height: 100%;
    border-color: black;
  }

  #sidebar-links .list-group-item {
    display: flex;
    align-items: center;
  }

  #notification-button {
    background-color: var(--secondary);
    border-color: var(--button-background);
    width: 80px;
    color: var(--button-background);
    border-radius: 20px;
  }

  #notifications-container {
    max-height: 300px;
    overflow-y: auto;
    width: 300px;
  }

  #notification-button:hover {
    background-color: var(--button-hover-primary);
    color: white;
  }

  .notification-item {
    padding: 10px;
    margin: 10px;
    border-radius: 20px;
    border: 2px solid var(--other-primary);
    background-color: var(--primary);
    text-align: center;
  }

  .notification-item:hover {
    background-color: var(--quaternary);
    cursor: pointer;
  }

  .bi {
    font-size: 1.5rem;
    margin: 0px 20px;
  }

  #sidebar-links li {
    color: var(--links-primary);
    border: 0px solid rgba(0, 0, 0, 0.5);
    border-radius: 20px;
  }

  #sidebar-links li:hover {
    color: var(--links-hover);
    background-color: var(--links-hover-background);
  }

  #sidebar-icon {
    font-size: 2rem;
    cursor: pointer;
  }

  #sidebar-links a {
    text-decoration: none;
    color: var(--links-primary);
  }

  #signup-button, #login-button {
    margin-right: 10px;
    background-color: var(--button-background);
    border-color: var(--button-background);
    color: white;
    padding: 8px;
    width: 80px;
  }

  #navbarDropdown {
    margin: 0px;
    padding-top: 10px;
  }
  #signup-button:hover, #login-button:hover {
    background-color: var(--button-hover-primary)
  }

</style>