import { getStorage} from 'firebase/storage';
import { initializeApp} from 'firebase/app';

    const firebaseConfig = {
        apiKey: "AIzaSyCdGUaSpc-eND_s6BcetanFOFDGL-TqGOA",
        authDomain: "eclectic-6cb68.firebaseapp.com",
        projectId: "eclectic-6cb68",
        storageBucket: "eclectic-6cb68.appspot.com",
        messagingSenderId: "984116529742",
        appId: "1:984116529742:web:b674ce5132f64cc420d11f"
      };

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app};