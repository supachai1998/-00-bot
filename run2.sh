# ไฟล์นี้ใช้สำหรับ Linux
# LOGIN[user:id:pass]
# MODE_AMAZON[boolean]
# MODE_ADVENTURE[boolean]
# LINE_API[string]
# yarn go
while true
do
    # LOGIN2="user:at123457:1*3*5*" LINE_API2="SRiDgJf3Dz80Fsou3O5fs0tnIpGIaq2OFiRambwpfsv"  \
    LOGIN1="user:royal1:888888"  LINE_API1="SRiDgJf3Dz80Fsou3O5fs0tnIpGIaq2OFiRambwpfsv" \
    LOGIN2="user:royal2:999999"  LINE_API2="SRiDgJf3Dz80Fsou3O5fs0tnIpGIaq2OFiRambwpfsv" \
    yarn start
    RR=$((60+RANDOM % (150-60)))
    echo "Restarting... $RR seconds"
    sleep $RR
done