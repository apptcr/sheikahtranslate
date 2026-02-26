const mainInput = document.getElementById('mainInput');
const mainOutput = document.getElementById('mainOutput');
const swapBtn = document.getElementById('swapBtn');
const labelInput = document.getElementById('labelInput');
const labelOutput = document.getElementById('labelOutput');

// เพิ่ม Element สำหรับ Modal (Pop-up)
const modal = document.getElementById("refModal");
const refBtn = document.getElementById("refBtn");
const closeBtn = document.querySelector(".close-btn");
const chartGrid = document.getElementById("chartGrid");

let isReverse = false;

// สร้างข้อมูลตารางอ้างอิง (A-Z, 0-9 และเครื่องหมาย -)
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-".split("");
if (chartGrid) {
    alphabet.forEach(char => {
        const item = document.createElement("div");
        item.className = "chart-item";
        // ถ้าเป็นเครื่องหมาย - ให้แสดงชื่อว่า SPACE ตามที่คุณต้องการให้มันทำหน้าที่แทนช่องว่าง
        const label = (char === "-") ? "SPACE" : char;
        item.innerHTML = `<span>${label}</span><div class="sheikah-font">${char}</div>`;
        chartGrid.appendChild(item);
    });
}

// ฟังก์ชันสำหรับสลับโหมดการทำงาน
swapBtn.addEventListener('click', () => {
    isReverse = !isReverse;
    
    // ล้างข้อมูลเก่าออกเมื่อสลับโหมด
    mainInput.value = "";
    mainOutput.textContent = "";

    if (isReverse) {
        // เปลี่ยนโหมดเป็น แปลจาก Sheikah -> English
        labelInput.textContent = "Sheikah Input";
        labelOutput.textContent = "English Translation";
        mainInput.classList.add('input-sheikah');
        mainOutput.classList.remove('sheikah-font');
        mainOutput.classList.add('normal-font');
        mainInput.placeholder = "Type here...";
    } else {
        // เปลี่ยนโหมดกลับเป็น แปลจาก English -> Sheikah
        labelInput.textContent = "English Input";
        labelOutput.textContent = "Sheikah Script";
        mainInput.classList.remove('input-sheikah');
        mainOutput.classList.remove('normal-font');
        mainOutput.classList.add('sheikah-font');
        mainInput.placeholder = "Type here...";
    }
});

// ตรวจจับการพิมพ์และส่งค่าไปแสดงผล
mainInput.addEventListener('input', (e) => {
    let inputValue = e.target.value;

    if (!isReverse) {
        // โหมดปกติ: แปลจาก English -> Sheikah
        // แทนที่ Spacebar ด้วยเครื่องหมาย "-" เพื่อให้แสดงสัญลักษณ์ตามที่คุณต้องการ
        const processedText = inputValue.replace(/ /g, "-");
        mainOutput.textContent = processedText;
    } else {
        // โหมดแปลย้อนกลับ: Sheikah -> English
        // แสดงผลตามที่พิมพ์ปกติ (เนื่องจากฟอนต์ใน Input เป็น Sheikah อยู่แล้ว)
        mainOutput.textContent = inputValue;
    }
});

// --- ระบบควบคุม Pop-up (Modal) ---

// เปิด Modal เมื่อกดปุ่ม
if (refBtn) {
    refBtn.onclick = function() {
        modal.style.display = "block";
    }
}

// ปิด Modal เมื่อกดปุ่ม (x)
if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
}

// ปิด Modal เมื่อคลิกพื้นที่ว่างนอกหน้าต่าง Pop-up
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}