<script>
    import { page } from "$app/stores";
    import { user } from "../../routes/UserStore";
    import { supabase } from "$lib/supabaseClient";
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
        Popover
    } from 'sveltestrap';
    import { onMount } from "svelte/internal";

    let open = false;
    const toggle = () => {open = !open};

    let rating;
    let reviewText = '';
    let courseID = $page.params.courseID

    let userID;
    user.subscribe((data) => {
      if (data) {userID = data.user.id}
    })

    const addReview = async () => {
      const { error } = await supabase
        .from('reviews')
        .insert({ course_id: parseInt(courseID), user_id: userID, rating: rating, review_text: reviewText })
    }

</script>


<div>

    <Button color="outline-success" on:click={toggle}>Add Review</Button>

    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Add Review</ModalHeader>
      <Form on:submit={addReview}>
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
        <Button color="outline-success" type="submit">Add</Button>
      </ModalFooter>
    </Form>
    </Modal>
  </div>