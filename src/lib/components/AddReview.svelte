<script>
// @ts-nocheck

    import { page } from "$app/stores";
    import {
        Button,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
        Form, 
        FormGroup, 
        FormText, 
        Input, 
        Label
    } from 'sveltestrap';

    let open = false;
    const toggle = () => {open = !open};

    let rating;
    let reviewText = '';

    const addReview = () => {
        
    }


</script>


<div>

    <Button color="outline-success" on:click={toggle}>Add Review</Button>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Add Review</ModalHeader>
      <ModalBody>
        <Form>
            <FormGroup>
                <Input type="number" placeholder="Rating / 10" bind:value={rating}/>
              </FormGroup>

            <FormGroup>
                <Input type="textarea" name="text" placeholder="Review" bind:value={reviewText}/>
            </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="outline-secondary" on:click={toggle}>Cancel</Button>
        <Button color="outline-success" on:click={toggle}>Add</Button>
      </ModalFooter>
    </Modal>
  </div>