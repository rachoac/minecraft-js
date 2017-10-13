if [ -z "$1" ]; then
	echo "You must specify your minecraft name!"
	exit 1
fi

if [ -z "$2" ]; then
    echo "You must specify the server secret!"
    exit 1
fi



export M_USER=$1
export JS_SECRET=$2
reflex -g '*.js' -- sh -c './ship.sh {}'