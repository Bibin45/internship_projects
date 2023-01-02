import { useState,useEffect,useContext } from "react"
import { useParams,useNavigate } from "react-router-dom"
import axios from "axios";


function View(){

 
  const navigate=useNavigate()
      // useEffect(()=>{
      //         if(!value.islog) navigate('/')
      //     },
      //     [value.islog]
      // )
let par=useParams();
let name=localStorage.getItem('name')
useEffect(()=>{
Viewresume(par.id)
},[par.id])
const[view,setView]=useState()
let Viewresume=async()=>{
    let {data}=await axios.get(`http://karka.academy/api/action.php?request=get_react_resume_by_id&user=${name}&id=${par.id}`)
    
    setView(data.data.data)
  }
    return(
        <>
        {view &&
        <div className="container font text-secondary">
            
  
    <div className="align row mt-5">
        <h2 className="align col" >{JSON.parse(view).name}</h2>
        <div className="col-3 ">
        <h6 className=" align1 font  ">E-mail : <span  >{JSON.parse(view).email}</span></h6>
    </div>
  
  
  
    <div className="align row ">
        <h4 className="  align col  ">Role : {JSON.parse(view).role}</h4>
        <div className="col-3 ">
        <h6 className=" align1 font  ">Phone : <span  >{JSON.parse(view).phone}</span></h6>
      </div>
    
  </div>

<div className="card mt-3 p-2">
<h4 className="font align card p-3 text-center bg ">Objective</h4>
<span className="font ml-5 " id="objective">{JSON.parse(view).objective}</span>
<br/>
</div>
<div className="card mt-5 p-2">
<h4 className="text-center card font p-3 bg">Education</h4>
<table className="table text-center text-secondary  border p-3 table-striped">
    <thead >
      <tr>
        
        <th >Courses</th>
        <th >Year</th>
        <th >Institute</th>
        <th >Percentage</th>
      </tr>
      
    </thead>
    <tbody className="text-secondary " >
      {JSON.parse(view).education.map((item,index)=>{
        return(<>
        <tr key={index}>
          <td>{item.study}</td>
          <td>{item.year}</td>
          <td>{item.institute}</td>
          <td>{item.percentage}</td>
        </tr>
        </>)
      })}
      </tbody>
      
    
  </table>
  </div>
<div className="row mt-5">
  
  <div className="col m-1  card  ">
    
      <h4 className="text-center mt-3 mb-3 font card p-3 bg">Certification</h4>
      <table className="table text-center border p-3 table-striped text-secondary ">
      <thead >
      <tr>
        
        <th >Courses</th>
        <th >Institute</th>
        <th >Duration</th>
        
      </tr>
      
    </thead>
    <tbody className="text-secondary ">
      {JSON.parse(view).certification.map((item,index)=>{
        return(
        <tr key={index}>
          <td>{item.course}</td>
          <td>{item.tution}</td>
          <td>{item.duration}</td>
        </tr>
        )
      })}
      </tbody>
      </table>

  </div>
  
  <div className='col m-1 card '>
    <h4 className="text-center mt-3 mb-3 font card p-3 bg">Project</h4>
    <table className="table text-center text-secondary   border p-3 table-striped">
      <thead >
      <tr>
        
        <th >Title</th>
        <th >Abstract</th>
        
        
      </tr>
      
    </thead>
    <tbody className="text-secondary ">
      {JSON.parse(view).project.map((item,index)=>{
        return(
        <tr key={index}>
          <td>{item.title}</td>
          <td>{item.abstract}</td>
        </tr>
        )
      })}
      </tbody>
      </table>
   
    
  </div>
</div>

  <div className="card mt-5 p-2 mb-5">
  <h4 className="text-center font card p-3 bg">Experience</h4>
  <table className="table text-center text-secondary  border p-3 table-striped">
    <thead >
      <tr>
        
        <th >Company</th>
        <th >Experience In Years</th>
        <th >Designation</th>
        
      </tr>
      
    </thead>
    <tbody  className="text-secondary">
      {JSON.parse(view).experience.map((item,index)=>{
        return(<>
        <tr key={index}>
          <td>{item.company}</td>
          <td>{item.exp}</td>
          <td>{item.role}</td>
          
        </tr>
        </>)
      })}
      </tbody>
      
    
  </table>
  </div>
  <div className="row text-center">
  <div className=" card col pt-3 m-1">
<h5 className="card  font  p-3 bg  ">Skills :</h5>
<h6>{JSON.parse(view).skill.map((item,index)=>{return(<li className="align marl" key={index}>{item}</li>)})}</h6>
</div>

  <div className="card col pt-3  m-1    ">
    <h5 className="font card p-3 bg">Area of Interest :</h5>
    <h6>{JSON.parse(view).interest.map((item,index)=>{return(<li className="align marl " key={index}>{item}</li>)})}
    </h6>
    
  </div>
  <div className="card col pt-3  m-1 ">
    <h5 className="font card p-3  bg">Hobbies :</h5>
    <h6>{JSON.parse(view).hobby.map((item,index)=>{return(<li className="align  marl" key={index}>{item}</li>)})}</h6>
  </div>
  </div>
  <br/><br/>
  <div className="card p-3 mt-5">
    <h4> <span className="card p-3 font bg text-center">Personal Details :</span></h4><br/><br/>
    <div className="align marl1">
      <div className="row">
      <h5 className="font-weight-bold col-3 "> Father's Name : </h5>
      <p className="align marl2 col-2">{JSON.parse(view).father_name}</p>
    </div>
    <div className="row">
      <h5 className="font-weight-bold col-3 "> Mother's Name  : </h5>
      <p className="align marl2 col-2">{JSON.parse(view).mother_name}</p>
    </div>
    <div className="row">
      <h5 className="font-weight-bold col-3 "> Sibling's Name : </h5>
      <p className="align marl2 col-2">{JSON.parse(view).sibling_name}</p>
    </div>
    <div className="row">
      <h5 className="font-weight-bold col-3 "> Age : </h5>
      <p className="align marl2 col-2">{JSON.parse(view).age}</p>
    </div>
    <div className="row">
      <h5 className="font-weight-bold col-3 "> Blood Group : </h5>
      <p className="align marl2 col-2">{JSON.parse(view).blood_group}</p>
    </div>
    <div className="row">
      <h5 className="font-weight-bold col-3 "> Languages Known : </h5>
      <p className="align marl2 col-2">{JSON.parse(view).language.map((item,index)=>{return(<li className=" mb-1 card p-1" key={index}>{item}</li>)})}</p>
    </div>
    
    <div className="row">
      <h5 className="font-weight-bold col-3 "> Gender : </h5>
      <p className="align marl2 col-2">{JSON.parse(view).gender}</p>
    </div>
    <div className="row">
      <h5 className="font-weight-bold col-3 "> Maritial Status : </h5>
      <p className="align marl2 col-2">{JSON.parse(view).maritial_status}</p>
    </div>
    <div className="row">
      <h5 className="font-weight-bold col-3 "> Address : </h5>
      <p className="align marl2 col-2">{JSON.parse(view).address}</p>
    </div>
    </div>
  </div>
  <div className="card mt-3 p-2">
<h4 className="bg text-center font card p-3">Declaration : </h4>
<div className="row">
<p className="col">The Above mentioned details are true and best of my knowledge</p>
<div className="col-2">
<p>Your's Faithfully,</p>
<p>{JSON.parse(view).name}</p>
</div>
</div>
</div>
<button className="btn btn-primary btn-lg col-12 mt-3 mb-5"> Export To PDF</button>
    
    </div>
    
      
    </div>
    
        }
        </>
    )
}
export default View