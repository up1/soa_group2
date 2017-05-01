import axios from 'axios';

const isProduction = true;
const webUrl = 'http://139.59.102.212';

const StockService = axios.create({
  baseURL: `${isProduction ? webUrl : 'http://localhost'}:9001/`,
});

const SaleService = axios.create({
  baseURL: `${isProduction ? webUrl : 'http://localhost'}:9003/`,
});

const MemberService = axios.create({
  baseURL: `${isProduction ? webUrl : 'http://localhost'}:9004/`,
});

const BillingService = axios.create({
  baseURL: `${isProduction ? webUrl : 'http://localhost'}:9002/`,
});

export { StockService, SaleService, MemberService, BillingService };
