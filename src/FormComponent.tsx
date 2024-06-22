import React, { useState } from 'react';

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    district: '',
    vdc: '',
    plotNumber: '',
    date: '',
    elevation: '',
    forestType: '',
    plotType: '',
    plotSize: '',
    aspect: '',
    latitude: '',
    longitude: '',
    slope: '',
    soilColor: '',
    mainSpecies: ['', '', '', '', '', ''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpeciesChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedSpecies = formData.mainSpecies.map((species, i) => (i === index ? value : species));
    setFormData({ ...formData, mainSpecies: updatedSpecies });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = JSON.stringify(formData, null, 2);
    console.log('Form Data:', data);
    alert('Form data saved. Check the console for JSON output.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>जिल्ला:</label>
        <input type="text" name="district" value={formData.district} onChange={handleChange} />
      </div>
      <div>
        <label>गाविस:</label>
        <input type="text" name="vdc" value={formData.vdc} onChange={handleChange} />
      </div>
      <div>
        <label>प्लट नं.:</label>
        <input type="text" name="plotNumber" value={formData.plotNumber} onChange={handleChange} />
      </div>
      <div>
        <label>मिति:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </div>
      <div>
        <label>उचाइ:</label>
        <input type="text" name="elevation" value={formData.elevation} onChange={handleChange} />
      </div>
      <div>
        <label>वनको प्रकार:</label>
        <input type="text" name="forestType" value={formData.forestType} onChange={handleChange} />
      </div>
      <div>
        <label>प्लटको प्रकार:</label>
        <input type="text" name="plotType" value={formData.plotType} onChange={handleChange} />
      </div>
      <div>
        <label>प्लटको साइज:</label>
        <input type="text" name="plotSize" value={formData.plotSize} onChange={handleChange} />
      </div>
      <div>
        <label>मोहडा:</label>
        <input type="text" name="aspect" value={formData.aspect} onChange={handleChange} />
      </div>
      <div>
        <label>अक्षांश:</label>
        <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
      </div>
      <div>
        <label>देशान्तर:</label>
        <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
      </div>
      <div>
        <label>भिरालोपन:</label>
        <input type="text" name="slope" value={formData.slope} onChange={handleChange} />
      </div>
      <div>
        <label>माटोको रंग:</label>
        <input type="text" name="soilColor" value={formData.soilColor} onChange={handleChange} />
      </div>
      <div>
        <label>मुख्य प्रजाति:</label>
        {formData.mainSpecies.map((species, index) => (
          <div key={index}>
            <label>प्रजाति {index + 1}:</label>
            <input type="text" value={species} onChange={(e) => handleSpeciesChange(index, e)} />
          </div>
        ))}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default FormComponent;
