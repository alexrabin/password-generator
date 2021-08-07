import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Button } from 'react-bootstrap';
import React from 'react';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pwdLen: "16",
      symbols: true,
      numbers: true,
      lowerChars: true,
      upperChars: true,
      password : '',
      showErrorMessage: false
    }

  }
  
  getLenOptions () {
      let items = [];         
      for (let i = 0; i <= 128; i++) {             
           items.push(<option key={i} value={i}>{i}</option>);   
      }  
      return items;
  }
  render(){

    return (
      <div>
         <Navbar bg="light" expand="lg">
           <Container>
             <Navbar.Brand href="#home">React-Password-Generator</Navbar.Brand>
           </Container>
         </Navbar>
         <Container style={{marginTop: 20}}>
          <div className="main">
            <form>
              <div className="form-group">
                  <label className="form-label" htmlFor="pwdLen">Password Length</label>
                  <select id="pwdLen" style={{marginLeft : "5px"}} value={this.state.pwdLen} onChange= { (e) => {
                    this.setState({"pwdLen": e.target.value})
                  }}>
                        {this.getLenOptions()}
                      
                  </select>
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="symbols">Include Symbols (e.g. ?!@#$%)</label>
                <input type="checkbox" className="form-check-input" id="symbols" checked={this.state.symbols} onChange={this.handleCheckChange.bind(this)} name="symbols" key="symbols"/>
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="numbers">Include Numbers (e.g. 123456)</label>
                <input type="checkbox" className="form-check-input" id="numbers" checked={this.state.numbers} onChange={this.handleCheckChange.bind(this)} name="numbers" key="numbers"/>
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="lowerChars">Include Lowercase Characters (e.g. abcdef)</label>
                <input type="checkbox" className="form-check-input" id="lowerChars" checked={this.state.lowerChars} onChange={this.handleCheckChange.bind(this)} name="lowerChars" key="lowerChars"/>
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="upperChars">Include Uppercase Characters (e.g. ABCDEF)</label>
                <input type="checkbox" className="form-check-input" id="upperChars" checked={this.state.upperChars} onChange={this.handleCheckChange.bind(this)} name="upperChars" key="upperChars"/>
              </div>
            </form>
            <Button style={{marginTop: 10}} onClick={this.generatePassword.bind(this)}>Generate</Button>
            <div className="mb-3" style={{marginTop: 10}}>
            {this.state.showErrorMessage && <p className="text-danger">Must select at least one option</p>}

                <label><strong>Your new password:</strong></label>
                <div className="input-group" style={{margin: "10px 0px"}}>
                    <input type="text" className="form-control"  name="newPwd" value={this.state.password} readOnly/>
                    <Button variant="dark" onClick={this.handleCopy.bind(this)}>Copy</Button>

                </div>
                
            </div>
          </div>
         </Container>
      </div>
     );
  }
  handleCheckChange(event){
    const target = event.target;
    const n = target.name;    
    this.setState(currentState => {
      return { [n]: !currentState[n] };
    });
  }
  handleCopy = (e) => {
    const textField = document.createElement('textarea');
    textField.innerText = this.state.password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }
  generatePassword(){

    let options = [];
    if (this.state.symbols){
      const syms = "!?&@#$%".split("");
      options.push(...syms); 
    }
    if (this.state.numbers){
      const nums = "0123456789".split("");
      options.push(...nums);

    }
    if (this.state.lowerChars){
      const chars = "abcdefghijklmnopqrstuvwyxz".split("");
      options.push(...chars);

    }
    if (this.state.upperChars){
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWYXZ".split("");
      options.push(...chars);
    }
    if (options.length === 0){
      this.setState({showErrorMessage: true});
      return
    }
    else{
      options = this.shuffle(options);
      this.setState({showErrorMessage: false});

    }
    var indexPass = 0;
    var pass = "";
    while (indexPass < this.state.pwdLen){
      const char = options[Math.floor(Math.random() * options.length)];
      pass += char;
      indexPass++;
    }
    console.log(pass);
    this.setState({password: pass});
  }
  shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  } 
}

export default App;
