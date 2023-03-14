<script>
// @ts-nocheck

  import "carbon-components-svelte/css/white.css";
  import {signup} from './api/signup/+server'
  import {login} from './api/login/+server'

  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

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

//HOW DO WORK
export let data;
const user = writable([])
$: user.set(data.user)
setContext("user",user)

let userObj = {email:'',password:'',accountType:"Student",isLoggedIn:false}

function submitLogin(){
  userObj.isLoggedIn = true
  loginModal = false
  alert(JSON.stringify({email:userObj.email,pass:userObj.password}))
}


function submitSignUp(){
  userObj.isLoggedIn = true
  signUpModal = false
  alert(JSON.stringify({email:userObj.email,pass:userObj.password}))
}


</script>

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
<!--   <HeaderNavItem href="/" text="login"/>
  <HeaderNavItem href="/signup" text="signup" /> -->
  {#if !userObj.isLoggedIn}
    <Button kind="secondary" on:click={() => (loginModal = true)}>Login</Button>
    <Button kind="secondary" on:click={() => (signUpModal = true)}>Sign Up</Button>
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
  on:submit={submitLogin}
>
  <p>Login to account</p>
  <br />
  <Form on:submit={submitLogin}>
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
  on:submit = {submitSignUp}
>
  <p>Make an account</p>
  <br />
  <Form on:submit={submitSignUp}>
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


<slot></slot>