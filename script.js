document.addEventListener("DOMContentLoaded", () => {
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const form = document.getElementById("converter-form");
    const resultDiv = document.getElementById("result");
    const swapBtn = document.getElementById("swap-btn");
  
    const apiKey = "fca_live_xp59HwdyEngMXSQqtmx7tl7k7r2WWtajexciKp1n";
    const apiUrl = "https://api.freecurrencyapi.com/v1/latest";
  
    // Load currency options
    async function loadCurrencies() {
      try {
        const res = await fetch(`${apiUrl}?apikey=${apiKey}`);
        const data = await res.json();
        const currencies = Object.keys(data.data);
  
        currencies.forEach(code => {
          fromCurrency.add(new Option(code, code));
          toCurrency.add(new Option(code, code));
        });
  
        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
      } catch (error) {
        console.error(error);
        resultDiv.textContent = "Failed to load currencies.";
      }
    }
  
    // Convert currency
    async function convertCurrency(e) {
      e.preventDefault();
      const amount = parseFloat(document.getElementById("amount").value);
      const from = fromCurrency.value;
      const to = toCurrency.value;
  
      if (!amount || amount <= 0) {
        resultDiv.textContent = "Please enter a valid, positive amount.";
        return;
      }
  
      resultDiv.textContent = "Converting...";
  
      try {
        const res = await fetch(`${apiUrl}?apikey=${apiKey}&base_currency=${from}`);
        const data = await res.json();
        const rate = data.data[to];
  
        if (!rate) {
          resultDiv.textContent = "Currency conversion not available.";
          return;
        }
  
        const converted = (amount * rate).toFixed(2);
        resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
      } catch (error) {
        console.error(error);
        resultDiv.textContent = "Error during conversion. Try again.";
      }
    }
  
    // Swap from and to currencies
    function swapCurrencies() {
      [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    }
  
    // Event listeners
    form.addEventListener("submit", convertCurrency);
    swapBtn.addEventListener("click", swapCurrencies);
  
    loadCurrencies();
  });
  