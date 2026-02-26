const mainInput = document.getElementById('mainInput');
const mainOutput = document.getElementById('mainOutput');
const swapBtn = document.getElementById('swapBtn');
const labelInput = document.getElementById('labelInput');
const labelOutput = document.getElementById('labelOutput');

let isReverse = false;

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
        mainInput.placeholder = "Type here using '-' for spaces...";
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
