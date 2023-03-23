<script>
// @ts-nocheck

    import { page } from "$app/stores";
    import { addReview } from "$lib/api/csFunctions";
    import { user } from "../../routes/UserStore";
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
        Label,
        Spinner,
        Alert
    } from 'sveltestrap';
    
    export let courseID;
    let open = false;
    const toggle = () => {open = !open};

    let rating;
    let reviewText = '';
    let pending = false;
    let errorMessage = '';
    let success = false;

    const _addReview = async () => {
        pending = true;
        let res = await addReview(reviewText, rating, courseID, $user.user.id);
        if (res.error) {
            console.log(res.error);
            errorMessage = res.error;
        } else {
            console.log(res.data);
            success = true;
        }
        pending = false;
        
    }


</script>


<div>

    <Button color="outline-success" on:click={toggle}>Add Review</Button>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Add Review</ModalHeader>
      <Form on:submit={_addReview}>
      <ModalBody>
          <FormGroup>
              <Input type="number" placeholder="Rating / 10" bind:value={rating}/>
            </FormGroup>

          <FormGroup>
              <Input type="textarea" name="text" placeholder="Review" bind:value={reviewText}/>
          </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="outline-secondary" on:click={toggle}>Cancel</Button>
        <Button color="outline-success" on:click={toggle}>Add</Button>
        {#if !pending}
            <Button color="outline-success" type="submit">Submit</Button>
        {:else}
            <Button color="outline-success"><Spinner color="success" type="border" size="sm" /></Button>
        {/if}
      </ModalFooter>

      {#if errorMessage}
        <Alert color='danger'>{errorMessage}</Alert>
      {/if}

      {#if success}
        <Alert color='success'>Review Added</Alert>
      {/if}
    </Form>
    </Modal>
  </div>