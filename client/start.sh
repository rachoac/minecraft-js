if [ -z "$1" ]; then
	echo "You must specify your minecraft name!"
	exit 1
fi

if [ -z "$2" ]; then
    echo "You must specify the server!"
    exit 1
fi

if [ -z "$3" ]; then
    echo "You must specify the server secret!"
    exit 1
fi

if [ ! -d "scripts" ]; then
    mkdir "scripts"
fi

if [ ! -d "scripts/$1" ]; then
    mkdir "scripts/$1"
fi

SCRIPT_DIR=$(pwd)/scripts
echo "Place your .js scripts in $SCRIPT_DIR/$1."

export M_USER=$1
export M_SERVER=$2
export JS_SECRET=$3
reflex -g "scripts/$1/*.js" -- sh -c './ship.sh {}'