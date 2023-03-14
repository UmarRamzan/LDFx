<script>
  import "carbon-components-svelte/css/white.css";
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
} from "carbon-components-svelte";

let isSideNavOpen = false;
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
  <HeaderNavItem href="/" text="login"/>
  <HeaderNavItem href="/signup" text="signup" />
</HeaderNav>
</Header>

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