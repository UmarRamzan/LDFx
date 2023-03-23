<script lang="ts">
    import { Icon, Button, Offcanvas, ListGroup, ListGroupItem } from 'sveltestrap';
    let open = false;
    const toggle = () => (open = !open);
  </script>
  
  <div>
    <Button color="outline-secondary" on:click={toggle}><Icon name="arrow-right" /></Button>

    <Offcanvas
      header=""
      scroll
      isOpen={open}
      {toggle}
      backdrop={true}
    >

    <ListGroup flush>
        <ListGroupItem tag="a" href="#" >Swaps</ListGroupItem>
        <ListGroupItem tag="a" href="/reviews" on:click={toggle}>Reviews</ListGroupItem>
        <ListGroupItem tag="a" href="#">Donations</ListGroupItem>
        <ListGroupItem tag="a" href="#">Jobs</ListGroupItem>
      </ListGroup>
    </Offcanvas>
  </div>