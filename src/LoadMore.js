import { useState } from 'react';
import { Button,  Pagination,  Table } from 'react-bootstrap';
import './App.css';
const config = require ('./config.json')


//functional component
function LoadMore() {
  //1.states/hook  variable
  const [student,setStudent] = useState({
    data:[],
    meta:{
      pagination:{
        page: "",
        pageCount: "",
        pageSize: "",
        total: ""
      }
    }
  });

  const [PaginationItem,setPaginationItem]=useState([])   //pass array in initial data because we use map method

  //2.functions
  let goToPage = (e)=>{
    console.log(e.target.innerHTML);
    var pageno = parseInt(e.target.innerHTML);
    getStudents(e,pageno);
  }

  let getStudents = (e,pageno=1)=>{
    console.log("hello");
    //always wrap up the api calling code in try and catch block
    try {
      //api calling
      //there are 2 ways to call the api
      //1.fetch api 2.axios
      fetch(`${config.base_url}/api/friends?pagination[page]=${pageno}&pagination[pageSize]=10`)
      .then((data)=>{
        //let's make the data readable
        return data.json();
      }).then((data)=>{
        console.log(data);
    
        //now set the data in hook variable
        
        setStudent({
          ...student,
          data: student.data.concat(data.data),
          meta:data.meta
       });

      }).catch((err)=>{
        console.log(err);
      });

    } catch (error) {
      console.log(error)
    }
  }

  let LoadMore =(e)=>{
    //alert("ok")
    //if i m on the last page then the api shouldnt be called
      getStudents(e,student.meta.pagination.page + 1)
    
  }
  
  //3.return statements
  return (
    
      <>
          <div className='d-flex justify-content-center'>
          <h1>Read Operation with Load more</h1>
          <Button onClick={(e)=>{ getStudents (e)}}>Get Friends</Button>
          </div>
          {
            student.data.length > 0 &&
          <>
             <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Friend Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
               {
                 student.data.map(function(currentValue, index, arr){
                   console.log(arr[index].id)
                   console.log(arr[index].attributes.name)
                   return (
                       <tr key={index}>
                         <td>{arr[index].id}</td>
                         <td>{arr[index].attributes.name}</td>
                         <td>
                           <Button variant="primary" size="sm">View</Button>&nbsp;
                           <Button variant="success" size="sm">Edit</Button>&nbsp;
                           <Button variant="danger" size="sm">Delete</Button>
                         </td>
                       </tr>
                   )
                 })
                }
               </tbody>
             </Table>
           {
              (student.meta.pagination.page !== student.meta.pagination.pageCount)  &&
              <div className ='d-flex justify-content-center'>
                <Button variant="primary" onClick={(e)=>{ LoadMore(e) }}>Load More</Button>
              </div>
           }
          </>
          }
      </>
  )
}

export default LoadMore;
