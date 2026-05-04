import './App.css'

import {
 StackLayout,
 ThemeProvider
} from '@tracasa/tracasa-components';
import CustomErrorBoundary from './base/error-boundary';

function App() {

  return (
    <CustomErrorBoundary>
      <ThemeProvider defaultTheme="avantius">
        <StackLayout>
          <h1>Tracasa Components</h1>
          <p>
            Esto es un ejemplo de uso de los componentes de Tracasa.
          </p>
        </StackLayout>
      </ThemeProvider>
    </CustomErrorBoundary>
  )
}

export default App
