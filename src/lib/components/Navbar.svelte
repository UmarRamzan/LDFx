<script>
// @ts-nocheck

    import { Styles } from 'sveltestrap';
    import Signup from './Signup.svelte';
    import Login from './Login.svelte';
    import Sidebar from './Sidebar.svelte';

    import { supabase } from '$lib/supabaseClient';
    import { user,username } from '../../routes/UserStore';
    import { getUsername } from '$lib/api/csFunctions';

    import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem
    } from 'sveltestrap';
    
    import { onMount } from 'svelte/internal';

    onMount(async ()=>{
      const { data, error } = await supabase.auth.getSession()
      if (data) {user.set(data.session)}
      console.log("Data", data)

      //get username
      let _username = await getUsername(data.session.user.id)
      console.log("username: " ,_username.data[0].username)
      username.set(_username.data[0].username)

    })

    let currentUser;
    user.subscribe((data) => {currentUser = data; currentUser = currentUser})
    console.log(currentUser)

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        user.set(null);
    }
</script>

<Styles />

<Navbar color="light" light expand="md">
    <Sidebar />

    <div class="brand">
    <NavbarBrand href="/">LDFx</NavbarBrand>
    </div>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar >
        <NavItem>
          <div class="aboutUs">
          <NavLink href="/about">About Us</NavLink>
          </div>
        </NavItem>
        <NavItem>
          <div class="FAQ">
          <NavLink href="/">FAQ</NavLink>
          </div>
        </NavItem>
        <NavItem>
          <div class="howWeWork">
          <NavLink href="/HowWeWork">How We Work</NavLink>
          </div>
        </NavItem>
        {#if !currentUser}
        <NavItem>
          <div class="account-button">
            <Signup />
          </div>
        </NavItem>
        <NavItem>
            <Login />
        </NavItem>
        {:else}
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>{$username}</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem divider />
            <DropdownItem on:click={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/if}
      </Nav>
    </Collapse>
</Navbar>

<style>
  .navbar-nav {
  display: flex;
  align-items: center;
  justify-content: center;
}
  .howWeWork {
    margin-left: 10px;
    
  }
  .brand {
    color: red;
    margin-left: 10px;
  }

  .account-button {
    margin-right: 10px;
  }

  
</style>