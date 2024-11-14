console.log("Uppkopplad!");

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.id;

  if(page === "admin") {
    document.getElementById('load-products-btn').addEventListener('click', async () => {
      const productTableBody = document.getElementById('product-table').querySelector('tbody');
    
      // Rensa tabellen om den redan har data
      productTableBody.innerHTML = '';
    
      try {
        const response = await fetch('/api/products'); // Anropa servern
        const products = await response.json();
    
        products.forEach(product => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.price} SEK</td>
          `;
          productTableBody.appendChild(row);
        });
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      }
    });
  }

  if (page === "new-product") {
  
    const form = document.getElementById('productForm');
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Förhindra att formuläret skickas på det traditionella sättet

      // Hämta formulärvärden
      const formData = new FormData(event.target);
      const product = {
        name: formData.get("name"),
        description: formData.get("description"),
        url: formData.get("url"),
        brand: formData.get("brand"),
        sku: formData.get("sku"),
        price: formData.get("price"),
      };

      console.log(product);

      fetch('/admin/products/new', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify( product )
      })
      .then(response => {
          if (response.ok) {
              // Omdirigera till "Admin produkter" om allt gick bra
              window.location.href = '/admin/products';
          } else {
              alert('Ett fel uppstod vid lagring av produkten.');
          }
      })
      .catch(error => console.error('Fel vid fetch-anropet:', error));
    });
  }
});