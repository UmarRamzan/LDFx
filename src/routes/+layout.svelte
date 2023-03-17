<script>
// @ts-nocheck

  import "carbon-components-svelte/css/white.css";
  import {LoginDummy,SignUpDummy} from './api/dummyAPI/+server'

  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { onMount } from "svelte";

  import {
  Header,
  HeaderNav,
  HeaderNavItem,
  HeaderNavMenu,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SideNavLink,
  SkipToContent,
  Content,
  Grid,
  Row,
  Column,
  Button,
  Modal,
  TextInput,
  Dropdown,
  Form,
} from "carbon-components-svelte";

let isSideNavOpen = false;
let loginModal = false;
let signUpModal = false;


let userObj = {email:'',password:'',accountType:"Student",isLoggedIn:false}

//declare a store for user
const user = writable();
//set store to userObj when updated
$: user.set(userObj);
//set default 
setContext("user", user);

const submitLoginCred = async () => {
  let res = await LoginDummy(userObj)
  console.log(res)
  if (res.success){
    userObj.email = res.body.email
    userObj.password = res.body.password
    userObj.accountType = res.body.accountType
    userObj.isLoggedIn = true
    loginModal = false
    setContext("user", user)
  }
  else{
    alert(res.error)
  }

}

const submitSignUpCred = async () => {
  let res = await SignUpDummy(userObj)
  console.log(res)
  if (res.success){
    userObj.email = res.body.email
    userObj.password = res.body.password
    userObj.accountType = res.body.accountType
    userObj.isLoggedIn = true
    signUpModal = false
    setContext("user", user)
  }
  else{
    alert(res.error)
  }

}

function logOut(){
  userObj = {email:'',password:'',accountType:"Student",isLoggedIn:false}
  setContext("user", user)
}

//idk if u need this
onMount(async()=>{submitLoginCred,submitSignUpCred,logOut})

</script>

<!--
  align nav items to center

-->
<Header
persistentHamburgerMenu={true}
company="LDFX"
bind:isSideNavOpen
>
<svelte:fragment slot="skip-to-content">
  <SkipToContent />
</svelte:fragment>
<HeaderNav>
  <HeaderNavItem href="/" text="home" />
  <HeaderNavItem href="/about" text="about us" />
  <HeaderNavItem href="/HowWeWork" text="How We Work" />
  <HeaderNavItem href="/FAQ" text="FAQs" />
  <HeaderNavItem text="\t\t\t\t\t" />
<!--   <HeaderNavItem href="/" text="login"/>
  <HeaderNavItem href="/signup" text="signup" /> -->
  {#if !userObj.isLoggedIn}
    <Button kind="secondary" on:click={() => (loginModal = true)}>Login</Button>
    <Button kind="secondary" on:click={() => (signUpModal = true)}>Sign Up</Button>
  {:else}
    <Button kind="secondary" on:click={() => (logOut())}>Log Out</Button>
  {/if}

</HeaderNav>
</Header>

<!--LOGIN AND SIGN UP MODALS-->
<Modal
  bind:open={loginModal}
  modalHeading="Login"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  selectorPrimaryFocus="#email"
  hasForm
  on:click:button--secondary={() => (loginModal = false)}
  on:open
  on:close
  on:submit={submitLoginCred}
>
  <p>Login to account</p>
  <br />
  <Form on:submit={submitLoginCred}>
  <TextInput
    id="email"
    labelText="Email"
    placeholder="Enter Email..."
    bind:value={userObj.email}
  />
  <TextInput
    id="password"
    labelText="Password"
    placeholder="Enter Password..."
    bind:value={userObj.password}
  />
  </Form>
</Modal>

<Modal
  bind:open={signUpModal}
  modalHeading="Sign Up"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  selectorPrimaryFocus="#email"
  hasForm
  on:click:button--secondary={() => (signUpModal = false)}
  on:open
  on:close
  on:submit = {submitSignUpCred}
>
  <p>Make an account</p>
  <br />
  <Form on:submit={submitSignUpCred}>
  <Dropdown
    titleText="AcountType"
    selectedId="0"
    bind:value={userObj.accountType}
    items={[
      { id: "0", text: "Student" },
      { id: "1", text: "Alumni" },
    ]}
  />
  <TextInput
    id="email"
    labelText="Email"
    placeholder="Enter Email..."
    bind:value={userObj.email}
  />
  <TextInput
    id="password"
    labelText="Password"
    placeholder="Enter Password..."
    bind:value={userObj.password}
  />
  </Form>
</Modal>

<!--THE SIDEBAR-->

<SideNav bind:isOpen={isSideNavOpen}>
<SideNavItems>
  <SideNavLink text="Link 1" />
  <SideNavLink text="Link 2" />
  <SideNavLink text="Link 3" />
  <SideNavMenu text="Menu">
    <SideNavMenuItem href="/" text="Link 1" />
    <SideNavMenuItem href="/" text="Link 2" />
    <SideNavMenuItem href="/" text="Link 3" />
  </SideNavMenu>
</SideNavItems>
</SideNav>


<Content>
<Grid>
  <Row>
    <Column>
    </Column>
  </Row>
</Grid>
</Content>

<style>
  
  .bx--header__nav-item {
    display: flex;
    align-items: center;
  }

</style>

<slot></slot>