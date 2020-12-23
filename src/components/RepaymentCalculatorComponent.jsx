import React, { Component } from 'react'
import CalculatorService from '../services/CalculatorService';


class RepaymentCalculatorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            loanAmount: 100100,
            annualIntrestRate: 10,
            term: 36,
            residualValue: 0,
            repayment: '',
            data:[]
        }
        this.changeLoanAmountHandler = this.changeLoanAmountHandler.bind(this);
        this.changeAnnualIntrestRateHandler = this.changeAnnualIntrestRateHandler.bind(this);
        this.changeTermHandler = this.changeTermHandler.bind(this);
        this.changeResidualValueHandler = this.changeResidualValueHandler.bind(this);
        this.changeAnnualIntrestRateHandler = this.changeAnnualIntrestRateHandler.bind(this);
     
        this.saveQuote = this.saveQuote.bind(this);
    }

    componentDidMount() {
       this.getQuotes();
     }
    
     getQuotes(){
        CalculatorService.getAllQuotes().then(res=>{
            console.log(res.data)
            this.setState({
                data:res.data
            })
         })
         
     }
    saveQuote = (e) => {
        e.preventDefault();
        let quote = {loanAmount: this.state.loanAmount, annualInterestRate: this.state.annualIntrestRate, term: this.state.term, residualValueRV: this.state.residualValue};
        console.log('quote => ' + JSON.stringify(quote));

        // step 5
        if(this.state.loanAmount >=1000000){
            console.log("hello")
           this.props.history.push("/thanks");
        }
      
           CalculatorService.calculateRepayment(quote).then(res =>{
            this.getQuotes();
            });
            }
    
    changeLoanAmountHandler= (event) => {
        this.setState({loanAmount: event.target.value});
      
    }

    changeAnnualIntrestRateHandler= (event) => {
        this.setState({annualIntrestRate: event.target.value});
    }

    changeTermHandler= (event) => {
        this.setState({term: event.target.value});
    }
    changeResidualValueHandler= (event) => {
        this.setState({residualValue: event.target.value});
    }

    cancel= () =>{
        this.setState({
            id: this.props.match.params.id,
            loanAmount: 100100,
            annualIntrestRate: 10,
            term: 36,
            residualValue: 0
           
        });
    }

    getTitle(){
      
            return <h3 className="text-center">Calculate Repayment</h3>
      
    }
    render() {
        return (
           
            <div>
                <br></br>
                   <div className = "container-fluid mt-3">
                        <div className = "row">
                            <div className = "card col-md-6 pt-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Loan Amount: $</label>
                                           <input placeholder="Loan Amount" name="loanAmount" className="form-control" 
                                                value={this.state.loanAmount} onChange={this.changeLoanAmountHandler}/>
                                        </div>
                                        <div className ="row">
                                        <div className = "col-md-6 col-sm-12 form-group">
                                            <label> Annual IntrestRate: % </label>
                                            <input placeholder="Intrest Rate" name="annualIntrestRate" className="form-control" 
                                                value={this.state.annualIntrestRate} onChange={this.changeAnnualIntrestRateHandler}/>
                                        </div>
                                        <div className = "col-md-6 col-sm-12 form-group">
                                            <label> Term in months : </label>
                                            <input type="text" placeholder="Term" name="term" className="form-control" 
                                                value={this.state.term} onChange={this.changeTermHandler}/>
                                        </div>
                                        </div>
                                        
                                        <div className = "form-group">
                                            <label> Residual Value : </label>
                                            <input placeholder="Residual Value" name="residualValue" className="form-control" 
                                                value={this.state.residualValue} onChange={this.changeResidualValueHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveQuote}>Save</button>
                                        <button className="btn btn-secondary" onClick={this.cancel} style={{marginLeft: "10px"}}>Reset</button>
                                    </form>
                                </div>
                            </div>
                            <div className="card col-md-5 ml-3   ">
                               <div className="text-center pt-3"> <h3>Loan Detail</h3> </div>
                                <hr/>
                               <div className="mt-3"> <b >Loan Required:</b><span className="float-right"> ${this.state.loanAmount}</span></div><br/>
                               <div className="mb-3"> <b >Ballon Payment:</b> <span className="float-right">${this.state.residualValue}</span></div><br/>
                                <hr/>
                           <div className="total"> <b className="mt-3">Approx Monthly Repayment :</b> 
                           <span className="float-right approx"> 
                           <b> ${(((this.state.loanAmount + this.state.residualValue)/2*(this.state.annualIntrestRate/1200)*this.state.term+ (this.state.loanAmount-this.state.residualValue))/this.state.term).toFixed(2)}</b></span></div>
                        </div>
                        </div>
                      <div className="text-center mt-5 text-info"><h4>SAVED QUOTES</h4></div> 
                     
                        <table className="table mt-3 mb-5">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Loan Amount</th>
                                <th scope="col">Term</th>
                                <th scope="col">Intrest Rate</th>
                                <th scope="col">Residual Value</th>
                                <th scope="col">Full Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                            { this.state.data.map((item,index)=>  {
                                    return ( <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td><b>$</b>{item.loanAmount}</td>
                                <td>{item.term} month</td>
                                <td>{item.annualInterestRate} <b>%</b></td>
                                <td>{item.residualValueRV} <b>%</b></td>
                                <td><b>$</b> {item.fullPayment.toFixed(2)}</td>
                                </tr>)})}
                            </tbody>
                        </table>
                   </div>
                  
            </div>
        )
    }
}

export default RepaymentCalculatorComponent
