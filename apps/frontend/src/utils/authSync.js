export function getFirebaseStorageData() {
  return new Promise((resolve) => {
    const request = indexedDB.open("firebaseLocalStorageDb", 1);

    request.onerror = () => resolve({});

    request.onsuccess = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("firebaseLocalStorage")) {
        db.close();
        resolve({});
        return;
      }

      const tx = db.transaction(["firebaseLocalStorage"], "readonly");
      const store = tx.objectStore("firebaseLocalStorage");

      const keysReq = store.getAllKeys();
      const valuesReq = store.getAll();

      tx.oncomplete = () => {
        const data = {};
        const keys = keysReq.result || [];
        const values = valuesReq.result || [];

        keys.forEach((key, index) => {
          data[key] = values[index];
        });

        db.close();
        resolve(data);
      };

      tx.onerror = () => {
        db.close();
        resolve({});
      };
    };
  });
}   