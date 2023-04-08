<script>
	import { deleteSwap, getSwapRequests } from "$lib/api/clientFunctions";
	import { onMount } from "svelte";
    import { user } from "../UserStore";
    import { goto } from "$app/navigation";

    let pending = false;

    let statusColors = {
        "Found": "#69ff91",
        "Pending": "#fffc69",
        "Not Found": "#fa5741",
    }

    let swapTableData = [];

    onMount( async () => {
        pending = true;
        let {success, data, error} = await getSwapRequests($user.id);
        if (success) {swapTableData = data;}
        pending = false;
    })

    const handleDeleteSwap = async (swapID) => {
        swapTableData = swapTableData.filter((swap) => swap.swap_id != swapID);
        const { success, data, error } =  deleteSwap(swapID);
    }

</script>

<div class="container  mt-5" id="content">
    
    <div class="row align-items-center">
        
        <div class="col">
        
            
            <h2>Swap Requests</h2>
        </div>
        <div class="col d-flex justify-content-end">
            <a href="/swaps/create" class="btn btn-outline-success">Create Swap Request</a>
            <i class="bi bi-send-plus"></i>
            <i class="bi bi-send"></i>
        </div>
        
    </div>

    <hr>

    <div class="row mt-5">
        <table class="table table-bordered" id="swap-table">
            <thead>
              <tr>
                <th scope="col">Have</th>
                <th scope="col">Want</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            
            {#if !pending}
            <tbody>
                {#each swapTableData as swap (swap.swap_id)}
                    <tr>
                        <td>
                            {#each swap.haveList as course (course.course_id)}
                                <p>{course.course_title}</p>
                            {/each}
                        </td>
                        <td>
                            {#each swap.wantList as course (course.course_id)}
                                <p>{course.course_title}</p>
                            {/each}
                        </td>
                        <td>
                            <div class="container">
                                <div class="row">
                                    <div class="col-8">
                                        <div class="status m-auto" style="background-color: {statusColors[swap.status]};">{swap.status}</div>
                                    </div>
                                    <div class="col">
                                        <i class="bi bi-trash" on:click={()=>{handleDeleteSwap(swap.swap_id)}}></i>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
            {/if}
          </table>

            {#if pending}
                <div class="d-flex w-100 justify-content-center mt-5">
                    <div class="spinner-border text-success" role="status"></div>
                </div>
            {/if}

    </div>
</div>

<style>

    #content {
        width: 60%;
        margin: auto;
        margin-top: 40px;
        border: 0px solid #000000;
        border-radius: 40px;
        background-color: var(--primary);
        background-color: var(--tertiary);
        padding: 40px;
        box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
    }

    th, td {
        padding: 20px;
    }

     #swap-table {
        text-align: center;
        border: 1px solid rgba(0,0,0,0.5);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
        background-color: var(--quaternary);
     }

     .status {
        padding: 10px;
        width: 100px;
        text-align: center;
        border: 1px solid rgb(0, 0, 0, 0.5);
        border-radius: 10px;
     }

     .bi {
        font-size: 2rem;
     }

     .bi:hover {
        cursor: pointer;
        color: red;
     }

</style>