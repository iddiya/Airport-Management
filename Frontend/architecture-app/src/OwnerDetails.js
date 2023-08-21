
import './OwnerDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiDeleteBinLine, RiAddLine } from 'react-icons/ri';

const OwnerDetails = ({ children }) => {
    const [owners, setowner] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [Edit, setEdit] = useState(false);
    const [Add, setAdd] = useState(false);
    // Calculate the total number of pages
    const totalPages = Math.ceil(owners.length / itemsPerPage);

    // Get the current items to display based on the current page number
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = owners.slice(indexOfFirstItem, indexOfLastItem);

    // Handle changing the page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [owner_id, setowner_id] = useState();
    const[Registration_number,setRegistration_number]=useState();
    const[Purchase_date,setPurchase_date]=useState();
    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log('Edit item with ID:', id);
        setEdit(true);
        setowner_id(id.owner_id);
        setRegistration_number(id.Registration_number);
        setPurchase_date(id.Purchase_date);
        setAdd(false);
    };

    const handleDelete = (id,event) => {
      event.preventDefault();
        
      const apiUrl = 'http://localhost:5000/owns/' + owner_id+"/"+Registration_number;
  
      // Optional: Headers for the request (e.g., if you need to send an authorization token)
      const headers = {
        'Content-Type': 'application/json',
        // Add any other required headers here
      };
     
        // Make the POST request using Axios
        axios.delete(apiUrl, { headers })
          .then((response) => {
            // Process the response data
            console.log('Response data:', response.data);
            if (response.status === 200 && response.data.message === "Airport apron updated successfully.") {
              axios.get('/getOwner') // The proxy is set to 'http://localhost:5000' in package.json
              .then(response => setowner(response.data))
              .catch(error => console.error('Error fetching data', error));
              setAdd(false);
    setEdit(false);
                // Do something with the data, if needed
            }
  
            // Do something with the data, if needed
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle any errors that occurred during the request
          });
      console.log('Delete item with ID:', id);


    };
    const handleAdd = (id) => {

        // Implement your add logic here
        setAdd(true);
        setEdit(false);
        setowner_id('');
        setRegistration_number('');
        setPurchase_date('');
        console.log('Add item with ID:', id);
    };
    
  const handleowner_id = (event) => {
    setowner_id(event.target.value);
  };
  const handleRegistration_number = (event) => {
    setRegistration_number(event.target.value);
  };
  const handlePurchase_date = (event) => {
    setPurchase_date(event.target.value);
  };
  const handleowner_idAdd = (event) => {
    setowner_id(event.target.value);
  };
  const handleRegistration_numberAdd = (event) => {
    setRegistration_number(event.target.value);
  };
  const handlePurchase_dateAdd = (event) => {
    setPurchase_date(event.target.value);
  };
  const handleSubmit = (event) => {
    //setcapacity(event.target.value);
    event.preventDefault();
    const data = {
      "Purchase_date": Purchase_date
    };
    const apiUrl = 'http://localhost:5000/owns/' + owner_id+"/"+Registration_number;

    // Optional: Headers for the request (e.g., if you need to send an authorization token)
    const headers = {
      'Content-Type': 'application/json',
      // Add any other required headers here
    };
   
      // Make the POST request using Axios
      axios.put(apiUrl, data, { headers })
        .then((response) => {
          // Process the response data
          console.log('Response data:', response.data);
          if (response.status === 200 && response.data.message === "Type of plane updated successfully.") {
            axios.get('/getOwner') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setowner(response.data))
            .catch(error => console.error('Error fetching data', error));
            setAdd(false);
    setEdit(false);
              // Do something with the data, if needed
          }

          // Do something with the data, if needed
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle any errors that occurred during the request
        });

  };
  const handleSubmitAdd = (event) => {
    //setcapacity(event.target.value);
    event.preventDefault();
    const data = {
      "owner_id": owner_id,
  "Registration_number": Registration_number,
  "Purchase_date": Purchase_date
    };
    const apiUrl = 'http://localhost:5000/owns';

    // Optional: Headers for the request (e.g., if you need to send an authorization token)
    const headers = {
      'Content-Type': 'application/json',
      // Add any other required headers here
    };
    
    // Make the POST request using Axios
    axios.post(apiUrl, data, { headers })
      .then((response) => {
        // Process the response data
        console.log('Response data:', response.data);
        axios.get('/getOwner') // The proxy is set to 'http://localhost:5000' in package.json
      .then(response => setowner(response.data))
      .catch(error => console.error('Error fetching data', error));
      setAdd(false);
    setEdit(false);
        // Do something with the data, if needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any errors that occurred during the request
      });

  };

  const [selectedOption, setSelectedOption] = useState('Option 1'); // For storing the selected option in the dropdown

  // Function to handle the dropdown selection
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [searchBox, setSearchBox] = useState('');
  // Options for the dropdown
  const dropdownOptions = ['Apron_number', 'Aircraft_Capacity', 'Apron_status','Apron_type'];
  const handleSearchChange = (query) => {
    setSearchBox(query);
  };
  const handlePostRequestSearch = (event) => {
    event.preventDefault();
    const data = {
      "column":selectedOption,
      "value":searchBox
    };
    const apiUrl = 'http://localhost:5000/search/owns';

    // Optional: Headers for the request (e.g., if you need to send an authorization token)
    const headers = {
      'Content-Type': 'application/json',
      // Add any other required headers here
    };
    
    // Make the POST request using Axios
    axios.post(apiUrl, data, { headers })
      .then((response) => {
        // Process the response data
        console.log('Response data:', response.data);
        setowner(response.data);
      setAdd(false);
    setEdit(false);
        // Do something with the data, if needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any errors that occurred during the request
      });

  };

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        axios.get('/getOwner') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setowner(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);


    return (
        <div>
            <div className='align_table'>
            <div>
                <h1>Owners Data
                <RiAddLine
                            onClick={() => handleAdd(123)}
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                        />
                  <div>
      
      <form className="dropdown-container">
        <label htmlFor="dropdown" className="dropdown-label"></label>
        <select id="dropdown" value={selectedOption} onChange={handleDropdownChange} className="dropdown-select">
          {dropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
        className="search-bar-input"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <button onClick={handlePostRequestSearch} className="my-button">
          Search
        </button>
      <div className="search-icon-container">
        
      </div>
        
      </form>
      
    </div>
                </h1>
                <table className="ownerAlign">
                    <thead>
                        <tr>
                            <th className="ownerheader">Owner ID</th>
                            <th className="ownerheader">Registration Number</th>
                            <th className="ownerheader">Purchase Date</th>
                            <th className="ownerheader">Actions</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((owner, index) => (
                            <tr key={index}>
                                <td className="ownercell">{owner.owner_id}</td>
                                <td className="ownercell">{owner.Registration_number}</td>
                                <td className="ownercell">{owner.Purchase_date}</td>
                                <td className="ownercell">
                                        <span>
                                            <RiEdit2Line
                                                onClick={() => handleEdit(owner)}
                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                            />
                                        </span>
                                        <span>
                                            <RiDeleteBinLine
                                                onClick={(e) => handleDelete(owner,e)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </span>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={pageNumber === currentPage}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
            </div>
            <div className='align_form'>
                    {Edit ? (
                        <form onSubmit={handleSubmit} className='labelAlign'>
                        <div className='Align_label'>Edit Owner</div>
                        <div className='form-group'>
                        <div className='floatleft'>Owner ID:</div>
                          <input type="text" value={owner_id} onChange={handleowner_id} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                        <div className='floatleft'>Registration_number:</div>
                          <input type="text" value={Registration_number} onChange={handleRegistration_number} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Purchase_date:</div>
                          <input type="text" value={Purchase_date} onChange={handlePurchase_date} className='floatright'/>
                        
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                    ) : null}

                    {Add ?
                        <form onSubmit={handleSubmitAdd} className='labelAlign'>
                        <div className='Align_label'>Add Owner:</div>
                        <div className='form-group'>
                        <div className='floatleft'>Owner_ID:</div>
                          <input type="text" value={owner_id} onChange={handleowner_idAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                        <div className='floatleft'>Registration_number:</div>
                          <input type="text" value={Registration_number} onChange={handleRegistration_numberAdd} className='floatright'/>
                        
                        </div>
                        <div className='form-group'>
                        
                            
                        <div className='floatleft'>Purchase_date:</div>
                          <input type="text" value={Purchase_date} onChange={handlePurchase_dateAdd} className='floatright'/>
                        
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                        : null}
                </div>
        </div>
    );
};

export { OwnerDetails };
