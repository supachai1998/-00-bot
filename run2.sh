# ไฟล์นี้ใช้สำหรับ Linux
# LOGIN[user:id:pass]
# MODE_AMAZON[boolean]
# MODE_ADVENTURE[boolean]
# LINE_API[string]
yarn go
while true
do

    # LOGIN1="user:at123457:1*3*5*" LINE_API1="SRiDgJf3Dz80Fsou3O5fs0tnIpGIaq2OFiRambwpfsv"  \
    LOGIN1="user:royal1:888888"  LINE_API1="XdCHOKlM2AtlSJ5App70CpnCjAovaqsQZaSStadtyqi" \
    LOGIN2="user:royal2:999999"  LINE_API2="XdCHOKlM2AtlSJ5App70CpnCjAovaqsQZaSStadtyqi" \
    LOGIN3="user:royal3:333333"  LINE_API3="XdCHOKlM2AtlSJ5App70CpnCjAovaqsQZaSStadtyqi" \
    LOGIN4="user:royal4:444444"  LINE_API4="XdCHOKlM2AtlSJ5App70CpnCjAovaqsQZaSStadtyqi" \
    LOGIN5="user:royal5:555555"  LINE_API5="XdCHOKlM2AtlSJ5App70CpnCjAovaqsQZaSStadtyqi" \
    LOGIN6="user:royal6:555555"  LINE_API6="XdCHOKlM2AtlSJ5App70CpnCjAovaqsQZaSStadtyqi" \
    LOGIN7="user:BobbyScholar:BobbyH" LINE_API7="SRiDgJf3Dz80Fsou3O5fs0tnIpGIaq2OFiRambwpfsv"  \
    yarn start
    RR=$((60+RANDOM % (150-60)))
    echo "Restarting... $RR seconds"
    sleep $RR
done