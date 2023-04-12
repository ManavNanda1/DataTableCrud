var arr = [];

$(document).ready(function () {
  ////------ Modal Code Below ---------------------//
  $(".getModalBtn").on("click", () => {
    $(".customModal").toggle(1000);
    $(".closebtn").click(function () {
      $(".customModal").hide(1000);
    });
  });

  //------------- Datatable Code Below = -----------//
  $(".subbtn").on("click", function () {
    let id = $(".MainTable").DataTable().rows().count() + 1;
    let name = $("#Name").val();
    let email = $("#Email").val();
    let pass = $("#Password").val();
    let rembtn = `<button class="btn btn-danger rem">Remove</button>`;
    let editdata = `<button class="btn btn-warning editbtn" onclick="EditData(this)">Edit</button>`;

    if (name == "" || email == "" || pass == "") {
      alert("Please fill in all the values first");
      return;
    } else {
      let body = $(".MainTable").DataTable();
      body.row.add([id, name, email, pass, rembtn, editdata]).draw(false);

      $("#Name").val("");
      $("#Email").val("");
      $("#Password").val("");
      $(".customModal").hide(500);
      arr.push({
        name: name,
        email: email,
        pass: pass,
        rembtn: rembtn,
        editdata: editdata,
      });
    }
  });

  $(".MainTable").on("click", ".rem", function () {
    let body = $(".MainTable").DataTable();
    let tr = $(this).closest("tr");
    body.row(tr).remove().draw(false);
  });

  $(".MainTable").on("click", ".editbtn", function () {
    // Get parent's tr
    let tr = $(this).parents("tr");
    let td1 = tr.find("td:eq(1)").html();
    let td2 = tr.find("td:eq(2)").html();
    let td3 = tr.find("td:eq(3)").html();

    // Add values of that in my Modal
    $(".customModal").show();
    $("#Name").val(td1);
    $("#Email").val(td2);
    $("#Password").val(td3);

    $(".subbtn").off("click").on("click", function () {
      let body = $(".MainTable").DataTable();
      let tr1 = $(tr);
      let rowData = body.row(tr1).data();
      rowData[1] = $("#Name").val();
      rowData[2] = $("#Email").val();
      rowData[3] = $("#Password").val();
      body.row(tr1).data(rowData).draw(false);
      $(".customModal").hide(500);
    });
  });

  $(".MainTable").DataTable({
    searching: false,
    paging: false,
    info: false,
  });
});

function Search(){

    let filter = document.getElementById("Searchbar").value.toUpperCase();
    let table = document.querySelector(".MainTable")
    let tr = table.getElementsByTagName('tr');

    for(let i=0; i<tr.length; i++){
      let td = tr[i].getElementsByTagName('td')[1];
      if(td){
      let textval = td.textcontent || td.innerHTML;
      if(textval.toUpperCase().indexOf(filter)>-1){
        tr[i].style.display=''
      }
      else{
        tr[i].style.display='none'
      }
    }
  }
}