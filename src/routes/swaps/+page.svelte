<script>
    let swapsList = [
        {
            "swap_id": 1,
            "have": "CS100",
            "want": "CS500",
            "status": "Found"
        },
        {
            "swap_id": 2,
            "have": "CS100",
            "want": "CS500",
            "status": "Pending"
        },
        {
            "swap_id": 3,
            "have": "CS100",
            "want": "CS500",
            "status": "Pending"
        },
        {
            "swap_id": 4,
            "have": "CS100",
            "want": "CS500",
            "status": "Not Found"
        }
    ]

    let statusColors = {
        "Found": "#69ff91",
        "Pending": "#fffc69",
        "Not Found": "#fa5741",
    }

    // bootstrap button in pure html that redirects to ./swaps/create





</script>



<div class="container w-50 mt-5" id="content">
    
    <div class="row align-items-center">
        <div class="col">
            <h1>Swap Requests</h1>
        </div>
        <div class="col d-flex justify-content-end">
            <a href="/swaps/create" class="btn btn-outline-success">Create Swap Request</a>
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
            <tbody>
                {#each swapsList as swap (swap.swap_id)}
                    <tr>
                        <td>{swap.have}</td>
                        <td>{swap.want}</td>
                        <td><div class="status m-auto" style="background-color: {statusColors[swap.status]};">{swap.status}</div></td>
                    </tr>
                {/each}
            </tbody>
          </table>
    </div>
</div>
<style>

#content {
    width: 60%;
    margin: auto;
    margin-top: 40px;
    border: 2px solid #000000;
    border-radius: 10px;
    background-color: var(--primary);
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
</style>