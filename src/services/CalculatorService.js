import http from "../httpCommon";


class CalculatorService {
    calculateRepayment(payment){
        return http.post("/addQuote", payment)
    }

    getAllQuotes(){
        return http.get("/getAllQuotes")
    }

    
}

export default new CalculatorService()
