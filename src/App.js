import SidebarItem from './components/SidebarItem'
import Slider from './components/Slider'
import { useState } from 'react'

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    reader.readAsDataURL(file)
  })

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },

  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: '%',
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: '%',
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: 'deg',
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: 'px',
  },
]

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [file, setFile] = useState('')
  const [dataUri, setDataUri] = useState('')

  const selectedOption = options[selectedOptionIndex]

  function handleUpload(file) {
    setFile('geldi')
    if (!file) {
      setDataUri('')
      console.log('file yok')
      return
    }
    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri)
    })
  }

  const handleSliderChange = ({ target }) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: target.value }
      })
    })
    getImageStyle()
  }

  const getImageStyle = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`
    })
    return { filter: filters.join(' '), backgroundImage: `url("${dataUri}")` }
  }

  return (
    <div className='container'>
      {file && <div className='main-image' style={getImageStyle()} />}
      <div class='file-input'>
        <input
          type='file'
          id='file'
          className='file'
          onChange={(event) => handleUpload(event.target.files[0] || null)}
        />
        <label for='file'>Select file</label>
      </div>
      <div className='sidebar'>
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={() => {
                setSelectedOptionIndex(index)
              }}
            />
          )
        })}
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
    </div>
  )
}

export default App
