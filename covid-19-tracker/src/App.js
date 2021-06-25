import   React ,{useState , useEffect}  from 'react';
import{
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';

import {Card , CardContent } from "@material-ui/core";
import Table from './Table';
import './Table.css';
import {sortData} from './util'
// import "leaflet/dist/leaflet.css";





function App() {


  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] =useState({});
  const [tableData , setTableData] = useState([]);
  
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data);
      console.log(data);

    });

  },[]);
 
  useEffect(() => {
    const getCountriesData = async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=> response.json())
      .then((data) => {
        const countries = data.map((country)=> (
        {
          name : country.country ,
          value :  country.countryInfo.iso2

        }
        ));
  
        setCountries(countries);  
        const sortedData= sortData(data);

        setTableData(sortedData);

      });
    }
    getCountriesData();
    
  }, [])

  const onCountyChange= (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);

  const url = countryCode === `worldwide`  ? `https://disease.sh/v3/covid-19/all` :
   `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  fetch(url)
  .then((response)=>response.json())
  .then((data)=>{

    setCountry(countryCode);
    setCountryInfo(data);
  })

  };
  

  
  return (

    <div className="app">
      <div className='app__left'>
      <div class='app__header'>

     
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select
        variant="standard"
        value={country}
        onChange={onCountyChange}
        >
          
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) =>( 
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
            }
            
          
          
        </Select>

      </FormControl> 
      </div>

      <div className='app__stats'>      
      <div className='each__box'><InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/></div>
      <div className='each__box'><InfoBox title="Patients Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/></div>
      <div className='each__box'><InfoBox title="Total Deaths Reported" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/></div>
      </div>

    

     

   


      </div>
      <Card className='app__right'>
            <CardContent>
              <h2>live cases</h2>
              <Table countries={tableData}/>

            </CardContent>
    
      </Card>

    </div>
  );
}

export default App;
