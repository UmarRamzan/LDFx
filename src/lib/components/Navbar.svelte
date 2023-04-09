<script>

  // @ts-nocheck

  import Signup from './Signup.svelte';
  import Login from './Login.svelte';

  import { getUserData,getUsername } from '$lib/api/csFunctions';
  import { logout } from '$lib/api/csFunctions';
  import { user, username } from '../../routes/UserStore';
  import { signupModalOpen, loginModalOpen } from '../../routes/ModalStore';

  import { onMount } from 'svelte';

  onMount( async () => {
    const userRes = await getUserData();
    if (userRes) { 
      user.set(userRes)
      const res = await getUsername(userRes.id);
      if (res.success){username.set(res.data[0].username)}
    }  
  })

  const handleLogout = async () => {
    await logout();
    user.set(null);
    username.set(null);
  }

  let showSignupModal = true;
  let showLoginModal = false;

  const toggleSignupModal = () => {showSignupModal = !showSignupModal}
  const toggleLoginModal = () => {showLoginModal = !showLoginModal}

</script>

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
        <a href="/FAQ"><li class="list-group-item"><i class="bi bi-question-octagon"></i>FAQs</li></a>
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
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      {#if $username}
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
  </div>
</nav>

<Signup showModal={showSignupModal} toggle={toggleSignupModal}/>
<Login showModal={showLoginModal} toggle={toggleLoginModal}/>

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
  }

</style>