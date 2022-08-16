import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faPen, faPaw, faUpload, faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data =[
  {id: 1, namePet: "Lucas", years: 1, species: "Perro"},
  {id: 2, namePet: "Tata", years: 5, species: "Gato"},
];



class App extends React.Component{
state ={
  data: data,
  form:{
    id:'',
    namePet:'',
    years:'',
    species:''
  },
  modalInsert: false,
  modalEdit: false
}

handleChange = eventData =>{
  this.setState({
    form:{
      ...this.state.form,
      [eventData.target.name]: eventData.target.value,
    }
  });
}
showModalInsert=()=>{
  this.setState({modalInsert: true});
}

hideModalInsert=()=>{
  this.setState({modalInsert: false});
}

insert = () =>{
   let newVal = {...this.state.form};
   newVal.id = this.state.data.length+1;
   let listInsert = this.state.data;
   if(newVal.namePet === "" || newVal.years === "" || newVal.species === ""){
    swal("Por favor llenar toda la información de la mascota");
   }else if(parseInt(newVal.years)>=0){
   listInsert.push(newVal);
   this.setState({data: listInsert, modalInsert: false});
   }else{
    swal("Por favor digitar una edad valida");
   }
}

showModalEdit=(register)=>{
  this.setState({modalEdit: true, form: register});
}

hideModalEdit=()=>{
  this.setState({modalEdit: false});
}

edit = (dataEdit) =>{
  let cont = 0;
  let listEdit = this.state.data;
  if(dataEdit.namePet === "" || dataEdit.years === "" || dataEdit.species === ""){
    swal("Por favor llenar toda la información de la mascota");
   }else if(parseInt(dataEdit.years)>=0){
     listEdit.map((register) => {
       if(dataEdit.id===register.id){
         listEdit[cont].namePet = dataEdit.namePet;
         listEdit[cont].years = dataEdit.years;
         listEdit[cont].species = dataEdit.species;
       }
       cont++;
     }); 
     this.setState({data: listEdit, modalEdit: false});
   }else{
    swal("Por favor digitar una edad valida");
   }
}

delete = (dataDelete) =>{
  let option = window.confirm("Esta seguro de querer eliminar el registro de " + dataDelete.namePet);
  if(option){
    let cont=0;
    let list = this.state.data;
    list.map((register)=>{
      if(register.id===dataDelete.id){
        list.splice(cont, 1);
      }
      cont++;
    })
    this.setState({data: list});
  } 
}

  render(){
    return(<>
    <Container>
    <div><h2><center>CRUD MASCOTA</center></h2></div>
    <br /><br />
    <Table>      
      <thead><tr>
      <th>Nombre</th>
      <th>Edad</th>
      <th>Especie</th>
      <th>Acciones</th>
      </tr></thead>
      <tbody>
      {this.state.data.map((element)=>(
          <tr>
            <td>{element.namePet}</td>
            <td>{element.years}</td>
            <td>{element.species}</td>
            <td><Button color="primary" onClick={() => this.showModalEdit(element)}><FontAwesomeIcon icon= {faFilePen} /></Button>{"  "}
            <Button color="danger" onClick={() => this.delete(element)}><ion-icon name="trash-sharp"></ion-icon></Button></td>
          </tr>
        ))}

      </tbody>
    </Table>

    <Modal isOpen={this.state.modalInsert}>
    <ModalFooter>
        <Button color='danger' onClick={() => this.hideModalInsert()}><FontAwesomeIcon icon= {faXmark} size="lg" /></Button>
      </ModalFooter>
      <ModalHeader>
        <div><h3>Insertar Nuevo Registro</h3></div>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <label>Id: </label>
          <input className='form-control' readOnly type="text" value={this.state.data.length+1}/>
        </FormGroup>
        <FormGroup>
          <label>Nombre: </label>
          <input placeholder='Nombre' className='form-control' name='namePet' type="text" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <label>Edad: </label>
          <input placeholder='Años' className='form-control' name='years' type="text" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <label>Especie: </label>
          <input placeholder='Especie' className='form-control' name='species' type="text" onChange={this.handleChange}/>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color='success' onClick={()=>this.insert()}><FontAwesomeIcon icon= {faUpload} /></Button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.modalEdit}>
    
    <ModalFooter>
        <Button color='danger' onClick={() => this.hideModalEdit()}><FontAwesomeIcon icon= {faXmark} size="lg" /></Button>
    </ModalFooter>
      <ModalHeader>
        <div><h3>Editar Registro</h3></div>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <label>Id: </label>
          <input className='form-control' readOnly type="text" value={this.state.form.id}/>
        </FormGroup>
        <FormGroup>
          <label>Nombre: </label>
          <input placeholder='Nombre' className='form-control' name='namePet' type="text" value={this.state.form.namePet} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <label>Edad: </label>
          <input placeholder='Años' className='form-control' name='years' type="text" value={this.state.form.years} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <label>Especie: </label>
          <input placeholder='Especie' className='form-control' name='species' type="text" value={this.state.form.species} onChange={this.handleChange}/>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={()=>this.edit(this.state.form)} ><FontAwesomeIcon icon= {faCircleCheck} size="lg" /></Button>
      </ModalFooter>
    </Modal>

    <br />
    <Button color="success" onClick={() => this.showModalInsert() }><FontAwesomeIcon icon= {faPaw} size="lg" /><FontAwesomeIcon icon= {faPen} size="xs"/></Button>    
    
    </Container>
    </>)
  } 
}
export default App;
