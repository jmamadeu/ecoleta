import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';
import axios from 'axios';

interface ItemDTO {
  id: number;
  image: string;
  title: string;
  image_url: string;
}

interface IBGEUfDTO {
  sigla: string;
}

interface IBGECityDTO {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const history = useHistory();

  const [ufs, setUfs] = useState<string[]>([]);
  const [items, setItems] = useState<ItemDTO[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [seletedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get('/items');

      setItems(response.data);
    })();
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUfDTO[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') return;

    axios
      .get<IBGECityDTO[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((item) => item.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  async function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  async function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(item: number) {
    const alreadySelected = selectedItems.findIndex(
      (item_id) => item_id === item
    );

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item_id) => item_id !== item);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { email, name, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const items = selectedItems;
    const [latitude, longitude] = seletedPosition;

    const data = {
      email,
      uf,
      name,
      whatsapp,
      city,
      items,
      latitude,
      longitude,
    };

    await api.post('/points', data);

    alert('Ponto de coleta criado!');

    history.push('/');

    console.log(data);
  }

  return (
    <>
      <div id='page-create-point'>
        <header>
          <img src={logo} alt='Ecoleta' />

          <Link to='/'>
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <h1>
            Cadastro do <br /> ponto de coleta
          </h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <div className='field'>
              <label htmlFor='name'>Nome da Entidade</label>
              <input
                type='text'
                name='name'
                id='name'
                onChange={handleInputChange}
              />
            </div>

            <div className='field-group'>
              <div className='field'>
                <label htmlFor='email'>E-mail</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  onChange={handleInputChange}
                />
              </div>
              <div className='field'>
                <label htmlFor='whatsapp'>Whatsapp</label>
                <input
                  type='text'
                  name='whatsapp'
                  id='whatsapp'
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              {/* <span>Selecione um ou mais ítens abaixo</span> */}
            </legend>

            <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={seletedPosition} />
            </Map>

            <div className='field-group'>
              <div className='field'>
                <label htmlFor='uf'>Estado (UF)</label>
                <select
                  name='uf'
                  value={selectedUf}
                  onChange={handleSelectedUf}
                  id='uf'>
                  <option value='0'>Selecione uma UF</option>
                  {ufs.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>

              <div className='field'>
                <label htmlFor='city'>City</label>
                <select
                  name='uf'
                  value={selectedCity}
                  onChange={handleSelectedCity}
                  id='uf'>
                  <option value='0'>Selecione uma Cidade</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Ítens de Coleta</h2>
              <span>Selecione um ou mais ítens abaixo</span>
            </legend>
            <ul className='items-grid'>
              {items.map((item) => (
                <li
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}>
                  <img src={item.image_url} alt={item.image} />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </fieldset>
          <button>Cadastrar ponto de coleta</button>
        </form>
      </div>
    </>
  );
};

export default CreatePoint;
